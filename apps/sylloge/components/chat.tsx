'use server';

export async function Chat() {
    const inputData =
        'Помоги мне с повышением на работе. У меня есть список тем, которые я должен знать, чтобы получить следующий грейд. Я буду давать тебе темы, а ты рассказывать мне про них, приводить практические примеры, предугадывать вопросы моего проверяющего вглубь темы. Первая тема это  Onion архитектура: основные понятия, структура.'; // Replace with your actual input data

    // Make a request to the Route Handler
    const res = await fetch('http://localhost:3000/api/chatAutomation', {
        method: 'POST',
        body: JSON.stringify({ inputData }),
        headers: { 'Content-Type': 'application/json' },
        cache: 'force-cache',
    });

    if (!res.ok) {
        // Handle errors
        throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    const data = await res.json();

    return (
        <>
            <h1>Chat Automation Result</h1>
            <div>
                <h2>Input Data:</h2>
                <pre>{inputData}</pre>
            </div>
            <div>
                <h2>Result:</h2>
                <pre>{data.data}</pre>
            </div>
        </>
    );
}
