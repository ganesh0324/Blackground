import { formSchema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";
import { getContext } from "@/lib/context/server";
import { isValidHandle } from "@atproto/syntax";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { oauthClient, logger } = await getContext();

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json(result.error, { status: 400 });
  }

  const handle = result.data?.handle;
  if (typeof handle !== "string" || !isValidHandle(handle)) {
    console.log("mujii khaate namilne handle haalxas??");
    return NextResponse.redirect(new URL("./login"));
  }

  try {
    const url = await oauthClient.authorize(handle.toString(), {
      scope: "atproto transition:generic",
    });
    console.log(url);
    return NextResponse.json(url);
  } catch (err) {
    logger.error({ err }, "oauth authorize failed");
    // return res.type("html").send(
    //   page(
    //     login({
    //       error:
    //         err instanceof OAuthResolverError
    //           ? err.message
    //           : "couldn't initiate login",
    //     }),
    //   ),
    // );
  }
  return NextResponse.json({ message: "Success" });
}
