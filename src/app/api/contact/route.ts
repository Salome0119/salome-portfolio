import { NextResponse } from "next/server";

/**
 * ============================================================
 *  API — Formulario de contacto
 * --------------------------------------------------------
 *  Valida y normaliza el mensaje. En este entorno no hay
 *  credenciales SMTP configuradas, por lo que la respuesta
 *  indica el canal de entrega disponible (mailto / WhatsApp).
 *
 *  ➜ Para activar el envío real de correos, integra aquí tu
 *    proveedor favorito (Resend, Nodemailer, SendGrid...):
 *
 *    import { Resend } from "resend";
 *    const resend = new Resend(process.env.RESEND_API_KEY!);
 *    await resend.emails.send({
 *      from: "Portfolio <onboarding@resend.dev>",
 *      to: "salohenao19@gmail.com",
 *      replyTo: email,
 *      subject: `Portfolio — ${name}`,
 *      text: message,
 *    });
 * ============================================================
 */

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  /** Honeypot: los bots llenan campos ocultos */
  website?: string;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "JSON inválido en la petición." },
      { status: 400 },
    );
  }

  // Honeypot: fingimos éxito pero no procesamos (anti-spam)
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim().slice(0, 80);
  const email = (body.email ?? "").trim().slice(0, 120);
  const subject = (body.subject ?? "Contacto desde el portafolio").trim().slice(0, 140);
  const message = (body.message ?? "").trim().slice(0, 4000);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Escribe tu nombre (mínimo 2 caracteres).";
  if (!emailRe.test(email)) errors.email = "Ingresa un correo válido.";
  if (message.length < 10) errors.message = "Cuéntame un poco más (mínimo 10 caracteres).";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // TODO: aquí va la integración real con el proveedor de correo.

  return NextResponse.json({
    ok: true,
    message: "Mensaje validado correctamente.",
    delivery: {
      channel: "mailto",
      to: email,
      subject,
      body: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
    },
  });
}
