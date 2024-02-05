/*
  Warnings:

  - Added the required column `name` to the `CustomForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomForm" ADD COLUMN     "name" TEXT NOT NULL;
