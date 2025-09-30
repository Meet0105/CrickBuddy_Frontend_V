// Helper function to get country flag emoji
export const getCountryFlag = (country: string): string => {
  const flagMap: { [key: string]: string } = {
    'India': '🇮🇳',
    'Australia': '🇦🇺',
    'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'South Africa': '🇿🇦',
    'New Zealand': '🇳🇿',
    'Pakistan': '🇵🇰',
    'Sri Lanka': '🇱🇰',
    'West Indies': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Bangladesh': '🇧🇩',
    'Afghanistan': '🇦🇫',
    'Ireland': '🇮🇪',
    'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    'Netherlands': '🇳🇱',
    'Zimbabwe': '🇿🇼',
    'Kenya': '🇰🇪',
    'Canada': '🇨🇦',
    'UAE': '🇦🇪',
    'USA': '🇺🇸',
    'Nepal': '🇳🇵',
    'Oman': '🇴🇲'
  };
  return flagMap[country] || '🏏';
};

// Helper function to get player initials for avatar
export const getPlayerInitials = (playerName: string): string => {
  return playerName.split(' ').map(name => name.charAt(0)).join('').substring(0, 2).toUpperCase();
};

// Fallback records data based on statsType and matchType
export const getFallbackRecords = (statsType: string, matchType: string): any[] => {
  const testRecords: { [key: string]: any[] } = {
    mostRuns: [
      { rank: '1', playerName: 'Sachin Tendulkar', country: 'India', value: '15,921', against: 'vs All Teams', ground: 'Worldwide', date: '1989-2013', playerId: 'sachin' },
      { rank: '2', playerName: 'Ricky Ponting', country: 'Australia', value: '13,378', against: 'vs All Teams', ground: 'Worldwide', date: '1995-2012', playerId: 'ponting' },
      { rank: '3', playerName: 'Jacques Kallis', country: 'South Africa', value: '13,289', against: 'vs All Teams', ground: 'Worldwide', date: '1995-2013', playerId: 'kallis' },
      { rank: '4', playerName: 'Rahul Dravid', country: 'India', value: '13,288', against: 'vs All Teams', ground: 'Worldwide', date: '1996-2012', playerId: 'dravid' },
      { rank: '5', playerName: 'Alastair Cook', country: 'England', value: '12,472', against: 'vs All Teams', ground: 'Worldwide', date: '2006-2018', playerId: 'cook' },
      { rank: '6', playerName: 'Kumar Sangakkara', country: 'Sri Lanka', value: '12,400', against: 'vs All Teams', ground: 'Worldwide', date: '2000-2015', playerId: 'sanga' },
      { rank: '7', playerName: 'Brian Lara', country: 'West Indies', value: '11,953', against: 'vs All Teams', ground: 'Worldwide', date: '1990-2006', playerId: 'lara' },
      { rank: '8', playerName: 'Shivnarine Chanderpaul', country: 'West Indies', value: '11,867', against: 'vs All Teams', ground: 'Worldwide', date: '1994-2015', playerId: 'chanderpaul' },
      { rank: '9', playerName: 'Mahela Jayawardene', country: 'Sri Lanka', value: '11,814', against: 'vs All Teams', ground: 'Worldwide', date: '1997-2014', playerId: 'mahela' },
      { rank: '10', playerName: 'Allan Border', country: 'Australia', value: '11,174', against: 'vs All Teams', ground: 'Worldwide', date: '1978-1994', playerId: 'border' }
    ],
    highestScore: [
      { rank: '1', playerName: 'Brian Lara', country: 'West Indies', value: '400*', against: 'vs England', ground: 'St. Johns, Antigua', date: 'Apr 2004', playerId: 'lara' },
      { rank: '2', playerName: 'Matthew Hayden', country: 'Australia', value: '380', against: 'vs Zimbabwe', ground: 'Perth, Australia', date: 'Oct 2003', playerId: 'hayden' },
      { rank: '3', playerName: 'Brian Lara', country: 'West Indies', value: '375', against: 'vs England', ground: 'St. Johns, Antigua', date: 'Apr 1994', playerId: 'lara' },
      { rank: '4', playerName: 'Mahela Jayawardene', country: 'Sri Lanka', value: '374', against: 'vs South Africa', ground: 'Colombo, Sri Lanka', date: 'Jul 2006', playerId: 'mahela' },
      { rank: '5', playerName: 'Garfield Sobers', country: 'West Indies', value: '365*', against: 'vs Pakistan', ground: 'Kingston, Jamaica', date: 'Feb 1958', playerId: 'sobers' },
      { rank: '6', playerName: 'Len Hutton', country: 'England', value: '364', against: 'vs Australia', ground: 'The Oval, London', date: 'Aug 1938', playerId: 'hutton' },
      { rank: '7', playerName: 'Sanath Jayasuriya', country: 'Sri Lanka', value: '340', against: 'vs India', ground: 'Colombo, Sri Lanka', date: 'Aug 1997', playerId: 'jayasuriya' },
      { rank: '8', playerName: 'Hanif Mohammad', country: 'Pakistan', value: '337', against: 'vs West Indies', ground: 'Bridgetown, Barbados', date: 'Jan 1958', playerId: 'hanif' },
      { rank: '9', playerName: 'Wally Hammond', country: 'England', value: '336*', against: 'vs New Zealand', ground: 'Auckland, New Zealand', date: 'Mar 1933', playerId: 'hammond' },
      { rank: '10', playerName: 'Don Bradman', country: 'Australia', value: '334', against: 'vs England', ground: 'Leeds, England', date: 'Jul 1930', playerId: 'bradman' }
    ],
    mostWickets: [
      { rank: '1', playerName: 'Muttiah Muralitharan', country: 'Sri Lanka', value: '800', against: 'vs All Teams', ground: 'Worldwide', date: '1992-2010', playerId: 'murali' },
      { rank: '2', playerName: 'Shane Warne', country: 'Australia', value: '708', against: 'vs All Teams', ground: 'Worldwide', date: '1992-2007', playerId: 'warne' },
      { rank: '3', playerName: 'Anil Kumble', country: 'India', value: '619', against: 'vs All Teams', ground: 'Worldwide', date: '1990-2008', playerId: 'kumble' },
      { rank: '4', playerName: 'James Anderson', country: 'England', value: '704', against: 'vs All Teams', ground: 'Worldwide', date: '2003-2024', playerId: 'anderson' },
      { rank: '5', playerName: 'Glenn McGrath', country: 'Australia', value: '563', against: 'vs All Teams', ground: 'Worldwide', date: '1993-2007', playerId: 'mcgrath' },
      { rank: '6', playerName: 'Courtney Walsh', country: 'West Indies', value: '519', against: 'vs All Teams', ground: 'Worldwide', date: '1984-2001', playerId: 'walsh' },
      { rank: '7', playerName: 'Kapil Dev', country: 'India', value: '434', against: 'vs All Teams', ground: 'Worldwide', date: '1978-1994', playerId: 'kapil' },
      { rank: '8', playerName: 'Richard Hadlee', country: 'New Zealand', value: '431', against: 'vs All Teams', ground: 'Worldwide', date: '1973-1990', playerId: 'hadlee' },
      { rank: '9', playerName: 'Shaun Pollock', country: 'South Africa', value: '421', against: 'vs All Teams', ground: 'Worldwide', date: '1995-2008', playerId: 'pollock' },
      { rank: '10', playerName: 'Wasim Akram', country: 'Pakistan', value: '414', against: 'vs All Teams', ground: 'Worldwide', date: '1985-2002', playerId: 'akram' }
    ]
  };

  const odiRecords: { [key: string]: any[] } = {
    mostRuns: [
      { rank: '1', playerName: 'Sachin Tendulkar', country: 'India', value: '18,426', against: 'vs All Teams', ground: 'Worldwide', date: '1989-2012', playerId: 'sachin' },
      { rank: '2', playerName: 'Virat Kohli', country: 'India', value: '13,906', against: 'vs All Teams', ground: 'Worldwide', date: '2008-2024', playerId: 'kohli' },
      { rank: '3', playerName: 'Ricky Ponting', country: 'Australia', value: '13,704', against: 'vs All Teams', ground: 'Worldwide', date: '1995-2012', playerId: 'ponting' },
      { rank: '4', playerName: 'Sanath Jayasuriya', country: 'Sri Lanka', value: '13,430', against: 'vs All Teams', ground: 'Worldwide', date: '1989-2011', playerId: 'jayasuriya' },
      { rank: '5', playerName: 'Rohit Sharma', country: 'India', value: '10,866', against: 'vs All Teams', ground: 'Worldwide', date: '2007-2024', playerId: 'rohit' },
      { rank: '6', playerName: 'Mahela Jayawardene', country: 'Sri Lanka', value: '12,650', against: 'vs All Teams', ground: 'Worldwide', date: '1998-2015', playerId: 'mahela' },
      { rank: '7', playerName: 'Inzamam-ul-Haq', country: 'Pakistan', value: '11,739', against: 'vs All Teams', ground: 'Worldwide', date: '1991-2007', playerId: 'inzamam' },
      { rank: '8', playerName: 'Jacques Kallis', country: 'South Africa', value: '11,579', against: 'vs All Teams', ground: 'Worldwide', date: '1996-2014', playerId: 'kallis' },
      { rank: '9', playerName: 'Sourav Ganguly', country: 'India', value: '11,363', against: 'vs All Teams', ground: 'Worldwide', date: '1992-2007', playerId: 'ganguly' },
      { rank: '10', playerName: 'Rahul Dravid', country: 'India', value: '10,889', against: 'vs All Teams', ground: 'Worldwide', date: '1996-2011', playerId: 'dravid' }
    ],
    highestScore: [
      { rank: '1', playerName: 'Rohit Sharma', country: 'India', value: '264', against: 'vs Sri Lanka', ground: 'Kolkata', date: '2014' },
      { rank: '2', playerName: 'Martin Guptill', country: 'New Zealand', value: '237*', against: 'vs West Indies', ground: 'Wellington', date: '2015' },
      { rank: '3', playerName: 'Virender Sehwag', country: 'India', value: '219', against: 'vs West Indies', ground: 'Indore', date: '2011' },
      { rank: '4', playerName: 'Rohit Sharma', country: 'India', value: '209', against: 'vs Australia', ground: 'Bengaluru', date: '2013' },
      { rank: '5', playerName: 'Chris Gayle', country: 'West Indies', value: '215', against: 'vs Zimbabwe', ground: 'Canberra', date: '2015' }
    ],
    mostWickets: [
      { rank: '1', playerName: 'Muttiah Muralitharan', country: 'Sri Lanka', value: '534', against: 'vs All', ground: 'Various', date: '1993-2011' },
      { rank: '2', playerName: 'Wasim Akram', country: 'Pakistan', value: '502', against: 'vs All', ground: 'Various', date: '1984-2003' },
      { rank: '3', playerName: 'Waqar Younis', country: 'Pakistan', value: '416', against: 'vs All', ground: 'Various', date: '1989-2003' },
      { rank: '4', playerName: 'Chaminda Vaas', country: 'Sri Lanka', value: '400', against: 'vs All', ground: 'Various', date: '1994-2008' },
      { rank: '5', playerName: 'Shahid Afridi', country: 'Pakistan', value: '395', against: 'vs All', ground: 'Various', date: '1996-2015' }
    ]
  };

  const t20Records: { [key: string]: any[] } = {
    mostRuns: [
      { rank: '1', playerName: 'Virat Kohli', country: 'India', value: '4188', against: 'vs All', ground: 'Various', date: '2010-2024' },
      { rank: '2', playerName: 'Rohit Sharma', country: 'India', value: '4026', against: 'vs All', ground: 'Various', date: '2007-2024' },
      { rank: '3', playerName: 'Martin Guptill', country: 'New Zealand', value: '3531', against: 'vs All', ground: 'Various', date: '2009-2022' },
      { rank: '4', playerName: 'Shoaib Malik', country: 'Pakistan', value: '2435', against: 'vs All', ground: 'Various', date: '2006-2021' },
      { rank: '5', playerName: 'David Warner', country: 'Australia', value: '3277', against: 'vs All', ground: 'Various', date: '2009-2024' }
    ],
    highestScore: [
      { rank: '1', playerName: 'Aaron Finch', country: 'Australia', value: '172', against: 'vs Zimbabwe', ground: 'Harare', date: '2018' },
      { rank: '2', playerName: 'Glenn Maxwell', country: 'Australia', value: '145*', against: 'vs Sri Lanka', ground: 'Pallekele', date: '2016' },
      { rank: '3', playerName: 'Rohit Sharma', country: 'India', value: '118', against: 'vs Sri Lanka', ground: 'Indore', date: '2017' },
      { rank: '4', playerName: 'Alex Hales', country: 'England', value: '116*', against: 'vs Sri Lanka', ground: 'Chittagong', date: '2014' },
      { rank: '5', playerName: 'Suresh Raina', country: 'India', value: '101*', against: 'vs South Africa', ground: 'St. Lucia', date: '2010' }
    ],
    mostWickets: [
      { rank: '1', playerName: 'Tim Southee', country: 'New Zealand', value: '164', against: 'vs All', ground: 'Various', date: '2008-2024' },
      { rank: '2', playerName: 'Shahid Afridi', country: 'Pakistan', value: '98', against: 'vs All', ground: 'Various', date: '2006-2018' },
      { rank: '3', playerName: 'Lasith Malinga', country: 'Sri Lanka', value: '107', against: 'vs All', ground: 'Various', date: '2006-2019' },
      { rank: '4', playerName: 'Shakib Al Hasan', country: 'Bangladesh', value: '149', against: 'vs All', ground: 'Various', date: '2006-2024' },
      { rank: '5', playerName: 'Umar Gul', country: 'Pakistan', value: '85', against: 'vs All', ground: 'Various', date: '2007-2016' }
    ]
  };

  const recordsByFormat = matchType === '1' ? testRecords : matchType === '2' ? odiRecords : t20Records;
  return recordsByFormat[statsType] || recordsByFormat['mostRuns'] || [];
};

// Fallback filters
export const fallbackFilters = [
  { value: 'mostRuns', header: 'Most Runs', category: 'Batting' },
  { value: 'highestScore', header: 'Highest Scores', category: 'Batting' },
  { value: 'highestAvg', header: 'Best Batting Average', category: 'Batting' },
  { value: 'mostHundreds', header: 'Most Hundreds', category: 'Batting' },
  { value: 'mostFifties', header: 'Most Fifties', category: 'Batting' },
  { value: 'mostWickets', header: 'Most Wickets', category: 'Bowling' },
  { value: 'bestBowlingFig', header: 'Best Bowling Figures', category: 'Bowling' },
  { value: 'bestBowlingAvg', header: 'Best Bowling Average', category: 'Bowling' }
];