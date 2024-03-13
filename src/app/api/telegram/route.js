"use server"
import { NextResponse } from "next/server";
import { Telegraf } from "telegraf";

let bot;

export const getBotInstance = async () => {
    if (!bot) {
        bot = new Telegraf(process.env.TOKEN);
        if (process.env.NODE_ENV === "development") {
            bot.launch({ dropPendingUpdates: true });
        }
    }
    return bot;
};

export async function POST(req) {
    try{
        const bot = await getBotInstance();
        if(process.env.NODE_ENV == "production")
           bot.handleUpdate(await req.json());
        return NextResponse.json({ "done": true });
    } catch (err){
        NextResponse.json({error: "Invalid"})
    }
}
