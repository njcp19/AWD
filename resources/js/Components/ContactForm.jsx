import { useForm } from '@inertiajs/react';
import Field from '@/Components/Field';

// Public contact form. Messages are validated by Laravel and saved in the `messages` table.
export default function ContactForm() {
    const { data, setData, post, processing, errors, reset } = useForm({ name: '', email: '', subject: '', message: '' });
    const cls = (n) => `input ${errors[n] ? 'has-error' : ''}`;

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.store'), { preserveScroll: true, onSuccess: () => reset() });
    };

    return (
        <form onSubmit={submit} className="space-y-5 text-left" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" htmlFor="c_name" error={errors.name}>
                    <input id="c_name" className={cls('name')} value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Juan dela Cruz" />
                </Field>
                <Field label="Email Address" htmlFor="c_email" error={errors.email}>
                    <input id="c_email" type="email" className={cls('email')} value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="juan@email.com" />
                </Field>
            </div>
            <Field label="Subject" htmlFor="c_subject" error={errors.subject}>
                <input id="c_subject" className={cls('subject')} value={data.subject} onChange={(e) => setData('subject', e.target.value)} placeholder="Project Inquiry" />
            </Field>
            <Field label="Message" htmlFor="c_message" error={errors.message}>
                <textarea id="c_message" rows={5} className={cls('message')} value={data.message} onChange={(e) => setData('message', e.target.value)} placeholder="Tell me about your project…" />
            </Field>
            <button type="submit" className="btn w-full !py-4 text-base" disabled={processing}>
                {processing ? 'Sending...' : 'Send Message ✦'}
            </button>
        </form>
    );
}
