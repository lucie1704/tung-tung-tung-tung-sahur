/*
  Warnings:

  - You are about to drop the column `endDate` on the `Promotion` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Promotion` table. All the data in the column will be lost.
  - Added the required column `date` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "date" TEXT NOT NULL;
