import transformBirthday from "@/utils/transformBirthday"

describe("@/utils/transformBirthday", () => {
  it("should return the correct birthday string", () => {
    expect(transformBirthday({ birthday: "1920-03-15" })).toBe("March 15, 1920")
  })
})
