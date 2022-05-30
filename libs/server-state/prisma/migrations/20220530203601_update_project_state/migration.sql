-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "stateId" TEXT;

-- AlterTable
ALTER TABLE "ProjectState" ADD COLUMN     "projectId" TEXT;

-- AddForeignKey
ALTER TABLE "ProjectState" ADD CONSTRAINT "ProjectState_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
