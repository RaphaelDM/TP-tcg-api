-- CreateTable
CREATE TABLE `auctions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `card_id` INTEGER NOT NULL,
    `seller_id` INTEGER NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `bidder_id` INTEGER NULL,
    `bid` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `auctions` ADD CONSTRAINT `auctions_card_id_fkey` FOREIGN KEY (`card_id`) REFERENCES `card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auctions` ADD CONSTRAINT `auctions_seller_id_fkey` FOREIGN KEY (`seller_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auctions` ADD CONSTRAINT `auctions_bidder_id_fkey` FOREIGN KEY (`bidder_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
