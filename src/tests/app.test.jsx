import { describe, test } from "vitest";
import { addData, getCurrentUser, isLoggedIn, logOut, signIn } from "../service/appService";

describe("app testing", () => {

  test("login", async () => {
    await signIn("johndoe@example.com", "shhhhh")

    expect(await getCurrentUser()).not.toBe(null)
  })

  test("logout", async () => {
    await logOut()

    expect(await getCurrentUser()).toBe(null)
  })

  test("add data", async () => {
    const value = await addData() 

    console.log(value)
  })
})
