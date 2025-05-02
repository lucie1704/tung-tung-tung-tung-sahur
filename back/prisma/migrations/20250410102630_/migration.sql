/*
  Warnings:

  - The primary key for the `Promotion_Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Promotion_Student` table. All the data in the column will be lost.
  - The primary key for the `Promotion_Teacher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Promotion_Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `promotionId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `promotionId` on the `Teacher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_promotionId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_promotionId_fkey";

-- AlterTable
ALTER TABLE "Promotion_Student" DROP CONSTRAINT "Promotion_Student_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Promotion_Student_pkey" PRIMARY KEY ("studentId", "promotionId");

-- AlterTable
ALTER TABLE "Promotion_Teacher" DROP CONSTRAINT "Promotion_Teacher_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Promotion_Teacher_pkey" PRIMARY KEY ("teacherId", "promotionId");

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "promotionId";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "promotionId";
