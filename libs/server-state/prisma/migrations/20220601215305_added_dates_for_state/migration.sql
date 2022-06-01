-- CreateTable
CREATE TABLE "ProjectStateDate" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "projectStateId" TEXT NOT NULL,

    CONSTRAINT "ProjectStateDate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectStateDate" ADD CONSTRAINT "ProjectStateDate_projectStateId_fkey" FOREIGN KEY ("projectStateId") REFERENCES "ProjectState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
