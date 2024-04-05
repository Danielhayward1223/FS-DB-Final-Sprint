CREATE TABLE villagers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  birthday VARCHAR(255), -- Season Day
  loves TEXT[],
  likes TEXT[],
  dislikes TEXT[],
  hates TEXT[]
);


INSERT INTO villagers (name, birthday, loves, likes, dislikes, hates)
VALUES ('Alex', 'Summer 13', '{Complete Breakfast, Salmon Dinner, Jack Be Nimble Jack Be Thick}', '{All Eggs, Field Snack}', '{All Books, Salmonberry, Wild Horseradish}', '{Holly, Quartz}');

INSERT INTO villagers (name, birthday, loves, likes, dislikes, hates)
VALUES ('Abigail', 'Fall 13', '{Amethyst, Banana Pudding, Blackberry Cobbler, Chocolate Cake, Monster Compendium, Pufferfish, Pumpkin, Spicy Eel}', '{Ancient Sword, Basilisk Paw, Bone Flute, Combat Quarterly, Quartz}', '{All Eggs, All Fruit, All Vegetables, Sugar, Wild Horseradish}', '{Clay, Holly}');

INSERT INTO villagers (name, birthday, loves, likes, dislikes, hates)
VALUES ('Elliot', 'Fall 5', '{Crab Cakes, Duck Feather, Lobster, Pomegranate, Squid Ink, Tom Kha Soup}', '{All Books, All Fruit, Octopus, Squid}', '{All Milk, Chanterelle, Common Mushroom, Daffodil, Dandelion, Ginger, Hazelnut, Holly, Leek, Magma Cap, Morel, Pizza, Purple Mushroom, Snow Yam, Wild Horseradish, Winter Root}', '{Amaranth, Quartz, Salmonberry, Sea Cucumber, Super Cucumber}');

INSERT INTO villagers (name, birthday, loves, likes, dislikes, hates)
VALUES ('Emily', 'Spring 27', '{Amethyst, Aquamarine, Cloth, Emerald, Jade, Ruby, Survival Burger, Topaz, Wool}', '{Daffodil, Quartz}', '{Fried Eel, Ice Cream, Rice Pudding, Salmonberry, Spicy Eel}', '{Fish Taco, Holly, Maki Roll, Salmon Dinner, Sashimi}');

INSERT INTO villagers (name, birthday, loves, likes, dislikes, hates)
VALUES ('Harvey', 'Winter 14', '{Coffee, Pickles, Super Meal, Truffle Oil, Wine}', '{All Fruit, Chanterelle, Common Mushroom, Daffodil, Dandelion, Duck Egg, Duck Feather, Ginger, Goat Milk, Hazelnut, Holly, Large Goat Milk, Leek, Magma Cap, Morel, Purple Mushroom, Quartz, Snow Yam, Spring Onion, Wild Horseradish, Winter Root}', '{Blueberry Tart, Bread, Cheese, Chocolate Cake, Clam, Cookie, Cranberry Sauce, Fried Mushroom, Glazed Yams, Goat Cheese, Hashbrowns, Ice Cream, Pancakes, Pink Cake, Pizza, Rhubarb Pie, Rice Pudding}', '{Coral, Nautilus Shell, Rainbow Shell, Salmonberry, Spice Berry}');

INSERT INTO villagers (name, birthday, loves, likes, dislikes, hates)
VALUES ('Haley', 'Spring 14', '{Coconut, Fruit Salad, Pink Cake, Sunflower}', '{Daffodil}', '{All Eggs, All Fruit, All Milk, All Vegetables, Chanterelle, Common Mushroom, Dandelion, Ginger, Hazelnut, Holly, Leek, Magma Cap, Morel, Purple Mushroom, Quartz, Snow Yam, Winter Root}', '{Clay, Prismatic Shard, Wild Horseradish}');

INSERT INTO villagers (name, birthday, loves, likes, dislikes, hates)
VALUES ('Sam', 'Summer 17', '{Cactus Fruit, Maple Bar, Pizza, Tigerseye}', '{All Eggs, Joja Cola}', '{All Vegetables, Chanterelle, Clam, Common Mushroom, Daffodil, Dandelion, Ginger, Hazelnut, Holly, Leek, Magma Cap, Morel, Purple Mushroom, Quartz, Salmonberry, Seaweed, Snow Yam, Wild Horseradish, Winter Root}', '{Coal, Copper Bar, Duck Mayonnaise, Gold Bar, Gold Ore, Iridium Bar, Iridium Ore, Iron Bar, Mayonnaise, Pickles, Refined Quartz}');

INSERT INTO villagers (name, birthday, loves, likes, dislikes, hates)
VALUES ('Sebastian', 'Winter 10', '{Frozen Tear, Obsidian, Pumpkin Soup, Sashimi, Void Egg}', '{Combat Quarterly, Flounder, Monster Compendium, Quartz}', '{All Flowers, Chanterelle, Common Mushroom, Daffodil, Dandelion, Ginger, Hazelnut, Holly, Leek, Magma Cap, Morel, Purple Mushroom, Salmonberry, Snow Yam, Wild Horseradish, Winter Root}', '{Clay, Complete Breakfast, Farmer’s Lunch, Omelet, Pina Colada}');

INSERT INTO villagers (name, birthday, loves, likes, dislikes, hates)
VALUES ('Maru', 'Summer 10', '{Battery Pack, Cauliflower, Cheese Cauliflower, Diamond, Gold Bar, Iridium Bar, Miner''s Treat, Pepper Poppers, Radioactive Bar, Rhubarb Pie, Strawberry}', '{Chanterelle, Copper Bar, Iron Bar, Oak Resin, Pine Tar, Quartz, Radioactive Ore}', '{Blackberry, Common Mushroom, Crystal Fruit, Maple Syrup, Salmonberry}', '{Holly, Honey, Pickles, Snow Yam, Truffle}');

INSERT INTO villagers (name, birthday, loves, likes, dislikes, hates)
VALUES ('Shane', 'Spring 20', '{Beer, Hot Pepper, Pepper Poppers, Pizza}', '{All Eggs, All Fruit}', '{Chanterelle, Common Mushroom, Daffodil, Dandelion, Ginger, Hazelnut, Holly, Leek, Magma Cap, Morel, Purple Mushroom, Seaweed, Snow Yam, Wild Horseradish, Winter Root}', '{Pickles, Quartz}');

INSERT INTO villagers (name, birthday, loves, likes, dislikes, hates)
VALUES ('Penny', 'Fall 2', '{All Books, Diamond, Emerald, Melon, Poppy, Poppyseed Muffin, Red Plate, Roots Platter, Sandfish, Tom Kha Soup}', '{All Milk, All Artifacts, Dandelion, Leek}', '{Algae Soup, Duck Feather, Pale Broth, Purple Mushroom, Quartz, Red Mushroom, Salmonberry, Wool}', '{Beer, Grape, Holly, Hops, Mead, Pale Ale, Pina Colada, Rabbit''s Foot, Wine}');

