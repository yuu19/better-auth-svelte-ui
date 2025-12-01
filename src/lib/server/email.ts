import { env } from '$env/dynamic/private';
import { Resend } from 'resend';

const resendApiKey = env.RESEND_API_KEY;
const from = env.RESEND_FROM ?? 'no-reply@example.com';

const resend = resendApiKey ? new Resend(resendApiKey) : null;

type SendVerificationInput = {
	user: { email: string; name?: string | null };
	url: string;
	token: string;
};

type SendMagicLinkInput = {
	email: string;
	url: string;
};

export async function sendVerificationEmail({ user, url }: SendVerificationInput) {
	if (!resend) {
		console.warn('[email] RESEND_API_KEY is not set; skipping verification email');
		return;
	}

	const recipientName = user.name ?? user.email.split('@')[0];

	await resend.emails.send({
		from,
		to: user.email,
		subject: 'Verify your email',
		html: `
			<p>Hi ${recipientName},</p>
			<p>Thanks for signing up. Please confirm your email by clicking the link below:</p>
			<p><a href="${url}">${url}</a></p>
			<p>If you didn't request this, you can ignore this email.</p>
		`,
		text: `Hi ${recipientName},\nVerify your email by visiting: ${url}\nIf you didn't request this, you can ignore this email.`
	});
}

export async function sendMagicLinkEmail({ email, url }: SendMagicLinkInput) {
	if (!resend) {
		console.warn('[email] RESEND_API_KEY is not set; skipping magic link email');
		return;
	}

	const recipientName = email.split('@')[0];

	await resend.emails.send({
		from,
		to: email,
		subject: 'Your magic sign-in link',
		html: `
			<p>Hi ${recipientName},</p>
			<p>Use the link below to sign in:</p>
			<p><a href="${url}">${url}</a></p>
			<p>This link will expire soon. If you didn't request it, you can ignore this email.</p>
		`,
		text: `Hi ${recipientName},\nUse this link to sign in: ${url}\nIt expires soon. If you didn't request it, ignore this email.`
	});
}
