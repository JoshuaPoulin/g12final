INSERT INTO
  articles
VALUES
  (default, 'Red Giants', 'https://www.sciencenews.org/article/red-giants-map-how-milky-way-grew?tgt=nr', 'http://orig03.deviantart.net/f182/f/2012/165/7/d/red_giant_by_paulinemoss-d53gcxu.jpg', 'Article about how Stars help explain our galaxy.'),
  (default, 'Help with Hacking','http://america.aljazeera.com/articles/2016/1/7/us-wants-tech-leaders-to-help-disrupt-isil.html','http://www.informationsecuritybuzz.com/wp-content/uploads/hacker-hacking-dark-hoodie.jpg', 'US government hiring Tech Leaders to hack ISIL.'),
  (default, 'David Bowie', 'http://america.aljazeera.com/articles/2016/1/11/david-bowie-a-shapeshifter-whose-genius-survived-every-transformation.html', 'http://cdn.playbuzz.com/cdn/e6dd9f36-c8ab-4987-9dea-2ada13eed85c/cd7aa249-8a20-4643-89b1-b01654384202.jpg', 'David Bowie passed away this week.  It is a sad week indeed.');

INSERT INTO
  opinions
VALUES
  (default, (SELECT id FROM articles WHERE title = 'Red Giants'), 'Stars are very cool!'),
  (default, (SELECT id FROM articles WHERE title = 'Red Giants'), 'No they are not!');