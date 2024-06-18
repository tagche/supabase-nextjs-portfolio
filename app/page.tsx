import type { Metadata } from "next";
import { createClient } from '@/utils/supabase/server';
import { supabaseCreateClient } from "@/utils/supabase/supabaseClient";
import OpeningBg from './components/openingBg';
import Container from "./components";

export const metadata: Metadata = {
    title: "Frontend Engineer Leo's Portfolio - Supabase(BaaS) & React",
    description: "Generated by create next app",
};

export default function Home() {
    const checkSupabaseClient = () => {
        try {
            //createClient();
            supabaseCreateClient();
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    const connectedSupabaseClient = async() => {
        const supabase = supabaseCreateClient(); //createClient();
        const { data: QUIZ } = await supabase.from('nextjs-quiz')
            .select('*')
            .order('id', { ascending: true })
        const { data: DB, error } = await supabase.from('nextjs-quiz-choices')
            .select('*')

        return(
            <Container QUIZ={QUIZ} DB={DB}></Container>
        )
    }

    return(
        <main className="flex flex-col items-center justify-between p-24">
            <OpeningBg></OpeningBg>
            {checkSupabaseClient() ? connectedSupabaseClient() : <p>接続エラー</p>}
        </main>
    )
}

