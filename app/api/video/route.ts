import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
    try {
        console.log(" getting them")
        await connectToDatabase()
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean()
        console.log(videos);
        if (!videos || videos.length === 0) {
            return NextResponse.json([], { status: 200 })
        }

        return  NextResponse.json(videos)

    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch videos ", err }, { status: 500 })
    }
}

export async function POST(request:NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized User " }, { status: 401 })
        }

        await connectToDatabase();

        const body: IVideo = await request.json();
        console.log("video info from imagekit : ",body);
        if(!body.description || !body.thumbnailUrl || !body.title || !body.videoUrl){
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const  videoData = {
            ...body,
            controls:body?.controls??true,
            transformation :{
                height : 1920,
                width:1080,
                quality : body.transformation?.quality??100
            },
        }

        const newVideo  = await Video.create(videoData);

        return NextResponse.json(newVideo);

    } catch (err) {
        return NextResponse.json({ error: "Failed to create a video",err }, { status: 500 })
    }
}
