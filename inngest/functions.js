import { generateNotesAiModel, GenerateStudyTypeAiModel } from "@/configs/AiModel";
import { inngest } from "./client";
import {db} from '@/configs/db';
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from '@/configs/schema';
import { eq } from 'drizzle-orm'

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const CreateNewUser=inngest.createFunction(
    {id:'create-user'},
    {event:'user.create'},
    async({event,step})=>{
        const {user}=event.data;
        //get event data
        const result = await step.run('Check User and create New if not in DB', async()=>{
            //check is user already exist
            const result = await db.select().from(USER_TABLE)
            .where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))

            if(result?.length==0)
            {
                // if not, add it to db
                const userResp = await db.insert(USER_TABLE).values({
                    name:user?.fullName,
                    email:user?.primaryEmailAddress?.emailAddress
                }).returning({id:USER_TABLE.id})
            }
        })

        return 'Success';
    }

    // Step is to send welcome email notification

    // Step to send email notification after 3 days once user join it
)

export const GenerateNotes=inngest.createFunction(
    {id:'generate-course'},
    {event:'notes.generate'},
    async({event,step})=>{
        const {course}=event.data; //all records info

        //Generate notes for each chapter with ai
        const notesResult=await step.run('Generate Chapter Notes',async()=>{
            const Chapters=course?.courseLayout?.chapters;
            let index = 0;
            Chapters.forEach(async(chapter)=>{
                const PROMPT='draft a script that is informative, engaging, and structured to facilitate easy understanding for each chapter, make sure to includes all topic point in the content, make sure to give content in HTML format(Do no add HTMLKL, Head, Body, title tag) The chapters: '+JSON.stringify(chapter);
                const result = await generateNotesAiModel.sendMessage(PROMPT);
                const aiResp=result.response.text();

                await db.insert(CHAPTER_NOTES_TABLE).values({
                    chapterId:index,
                    courseId:course?.courseId,
                    notes:aiResp
                })
                index=index+1;

            })
            return 'Completed'
        })

        //Updates Status to 'Ready'
        const updataCourseStatusResult=await step.run('Update Course Status to Ready',async()=>{
            const result=await db.update(STUDY_MATERIAL_TABLE).set({
                status:'Ready'
            }) .where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId))
            return 'Success';
        });
    }
)

// used to generate Flashcard, quiz, q&a
export const GenerateStudyTypeContent=inngest.createFunction(
    {id:'Generate Study Type Content'},
    {event:'studyType.content'},
    
    async ({event,step}) =>{
        const {studyType, prompt, courseId, recordId} = event.data;

        const FlashcardAiResult=await step.run('Generating FlashCard using AI', async()=>{
            const result = await GenerateStudyTypeAiModel.sendMessage(prompt);
            const AIResult = JSON.parse(result.response.text());
            return AIResult
        })

        //save the result

        const DbResult = await step.run('Save Result to DB', async()=>{
            const result=await db.update(STUDY_TYPE_CONTENT_TABLE)
            .set({
                content:FlashcardAiResult
            }).where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId))

            return 'Data inserted'
        })
    }
)