import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstQuestionArgs } from "db"

type GetQuestionInput = Pick<FindFirstQuestionArgs, "where">

export default async function getQuestion({where /* include */}: GetQuestionInput, ctx: Ctx) {
  const question = await db.question.findFirst({where, include: {choices: true}})
  return question
}
