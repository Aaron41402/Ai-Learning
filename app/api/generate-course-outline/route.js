import { courseOutlineAIModel } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {

    const {courseId, studyType, topic, chapter, difficultyLevel, duration, createdBy, video}=await req.json();

    const prompt = 'generate a study material for '+topic+' for '+studyType+' and level of difficulty will be '+difficultyLevel+'. There should be course title, summary of the course, List of Chapters (Max 3) along with summary and Emoji icon(store it in a variable called emoji) for each chapter, and the topics, there should not be more than 3 topics for each chapter, ALL result in JSON format'
    // generate course layout using ai
    const aiResp=await courseOutlineAIModel.sendMessage(prompt)
    const aiResult = JSON.parse(aiResp.response.text());

    // save the result along with user input
    const dbResult= await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId:courseId,
        courseType:studyType,
        createdBy:createdBy,
        topic:topic,
        courseLayout:aiResult
    }).returning({resp:STUDY_MATERIAL_TABLE})

    //Trigger the Inngest function to generate chapter notes

    const result=await inngest.send({
        name:'notes.generate',
        data:{
            course:dbResult[0].resp
        }
    });
    console.log(result);

    return NextResponse.json({result:dbResult[0]})
}