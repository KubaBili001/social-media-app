-- CreateIndex
CREATE INDEX "Comment_respondingTo_idx" ON "Comment"("respondingTo");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_respondingTo_fkey" FOREIGN KEY ("respondingTo") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
