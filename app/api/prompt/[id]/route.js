import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET Request
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.findById(params.id).populate("creator");

    if (!prompts) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 500,
    });
  }
};

// PATCH Request
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json(); // Ganti request.json() menjadi req.json()

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    // Update the prompt and tag
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    // Save the changes to the database
    await existingPrompt.save(); // Tambahkan save()

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 500,
    });
  }
};

// DELETE Request
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 500,
    });
  }
};
