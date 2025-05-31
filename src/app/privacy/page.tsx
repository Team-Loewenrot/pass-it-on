export default function PrivacyPage() {
    return (
        <main className="max-w-2xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400">Privacy Policy</h1>
            <p className="mb-4">
                PassItOn values your privacy. We collect only the information necessary to provide our service, such as your email, display name, and profile photo from your authentication provider. We do not sell your data to third parties.
            </p>
            <p className="mb-4">
                Your data is stored securely and used only for app functionality, such as authentication and displaying your profile. You can request deletion of your account and data at any time by contacting us.
            </p>
            <p>
                For privacy questions, email <a href="maximilian.zhu@loewenrot.de" className="underline text-green-600 dark:text-green-400">privacy@challengechain.app</a>.
            </p>
        </main>
    );
}