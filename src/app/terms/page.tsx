export default function TermsPage() {
    return (
        <main className="max-w-2xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400">Terms of Service</h1>
            <p className="mb-4">
                By using ChallengeChain, you agree to abide by these Terms of Service. You must be at least 13 years old to use this app. You are responsible for your activity and content. Do not post illegal, harmful, or offensive material. We reserve the right to suspend or terminate accounts that violate these terms.
            </p>
            <p className="mb-4">
                ChallengeChain is provided as-is, without warranties. We may update these terms at any time. Continued use of the app means you accept any changes.
            </p>
            <p>
                For questions, contact us at <a href="mailto:maximilian.zhu@loewenrot.de" className="underline text-green-600 dark:text-green-400">maximilian.zhu@loewenrot.de</a>.
            </p>
        </main>
    );
}