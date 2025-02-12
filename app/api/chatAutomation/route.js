// app/api/chatAutomation/route.js

import { setTimeout } from 'node:timers/promises';

import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request) {
    try {
        // Parse the request body
        const { inputData } = await request.json();

        if (!inputData) {
            return NextResponse.json(
                { message: 'Bad Request: inputData is required' },
                { status: 400 },
            );
        }

        // Your chatAutomation function
        async function chatAutomation(inputData) {
            // Launch the browser
            const browser = await puppeteer.launch({
                headless: 'new', // try 'new' or true
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });

            const page = await browser.newPage();

            await page.goto('http://chat:666/#/chat');

            // Implement your script logic here
            // ...

            // Example: Type the inputData into a textarea
            await page.waitForSelector('textarea#chat-input');
            await page.type('textarea#chat-input', inputData);

            // Click the Send button
            await page.waitForSelector(
                'button.button_icon-button__VwAMf.chat_chat-input-send__GFQZo',
            );
            await page.click('button.button_icon-button__VwAMf.chat_chat-input-send__GFQZo');

            // Wait for the response
            await setTimeout(30000);

            // Get the last message content
            const lastMessageSelector =
                'div.chat_chat-message__dg8rL:last-of-type div.markdown-body';

            await page.waitForSelector(lastMessageSelector);
            const lastMessageContent = await page.$eval(lastMessageSelector, (el) => el.innerText);

            // Close the browser
            await browser.close();

            return lastMessageContent;
        }

        // Call the function and get the result
        const result = await chatAutomation(inputData);

        // Return the result
        return NextResponse.json({ message: 'Success', data: result });
    } catch (error) {
        console.error('Error:', error);

        return NextResponse.json(
            { message: 'Error occurred', error: error.message },
            { status: 500 },
        );
    }
}
