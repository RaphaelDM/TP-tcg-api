-- DropIndex
DROP INDEX `auctions_bidder_id_fkey` ON `auctions`;

-- DropIndex
DROP INDEX `auctions_card_id_fkey` ON `auctions`;

-- DropIndex
DROP INDEX `auctions_seller_id_fkey` ON `auctions`;

-- AddForeignKey
ALTER TABLE `auctions` ADD CONSTRAINT `auctions_card_id_fkey` FOREIGN KEY (`card_id`) REFERENCES `card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auctions` ADD CONSTRAINT `auctions_seller_id_fkey` FOREIGN KEY (`seller_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auctions` ADD CONSTRAINT `auctions_bidder_id_fkey` FOREIGN KEY (`bidder_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
