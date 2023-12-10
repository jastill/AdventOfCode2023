
This is an interesting input file ... is that an eight or a two eightwo...
9nine27eightthree6f9eightwosg


# Trying to join rows in sqlite, when some rows dont' exist. May be easier to refactor the DB.

select * from (select rb.gameID as gameID, rb.turnID as turnID,blue,bluecount,red,redcount,g.color as green, g.count as greecount from (select a.gameID as gameID, a.turnID as turnID, a.color as red, a.count as redcount, b.color as blue, b.count as bluecount from mobi_astill_adventofcode2023_Game as a left join mobi_astill_adventofcode2023_Game as b on a.gameID=b.gameID and a.turnID=b.turnID and a.color='red' and b.color='blue') as rb left join mobi_astill_adventofcode2023_Game as g on rb.gameID = g.gameID and rb.turnID = g.turnID and g.color='green') where gameID=100 group by turnID,gameID order by gameID,turnID;