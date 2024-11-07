This small project is preresent the voting the articles with Redis 

*** Bussiness Requirement ***

1. Everyday, 1000 articles was posted on web
2. 50 articles from 1000 articles can be interested enought that we want to be them in top 100.
3. All of 50 articles will receive at least 200 votes up.
4. each articles deal with scores, scores is function of posting time + times vote of that articles. Day in seconds is 86400 divided by 200 votes  = 432 points for each vote
5. Table for Articles using Hash article:id {title, link, poster, time, votes}
6. to store ordered time of articles we using the Zset with key time: {article:id | time}
7. to store the ordered score of voting we using the Zset with key score: {articles:id  time}
8. to prevent the users from voting for the same articles more than one, we using the Set with key vote:articleId {user:id}
9. to save the memory, after a week users can no longer vote on an article and its score is fixed. after a week passed we will delete the SET of users who vote on an articles
