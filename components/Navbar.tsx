import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<{
    [key: string]: boolean;
  }>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [liveMatchesCount, setLiveMatchesCount] = useState(0);
  const liveScoresDropdownRef = useRef<HTMLDivElement>(null);
  const seriesDropdownRef = useRef<HTMLDivElement>(null);
  const teamsDropdownRef = useRef<HTMLDivElement>(null);
  const newsDropdownRef = useRef<HTMLDivElement>(null);
  const rankingsDropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown
  const toggleDropdown = (dropdownId: string) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [dropdownId]: !prevState[dropdownId],
    }));
  };

  // Close all dropdowns when clicking outside
  const closeAllDropdowns = () => {
    setIsDropdownOpen({});
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside any of the dropdowns
      const isOutsideLiveScores = liveScoresDropdownRef.current && !liveScoresDropdownRef.current.contains(event.target as Node);
      const isOutsideSeries = seriesDropdownRef.current && !seriesDropdownRef.current.contains(event.target as Node);
      const isOutsideTeams = teamsDropdownRef.current && !teamsDropdownRef.current.contains(event.target as Node);
      const isOutsideNews = newsDropdownRef.current && !newsDropdownRef.current.contains(event.target as Node);
      const isOutsideRankings = rankingsDropdownRef.current && !rankingsDropdownRef.current.contains(event.target as Node);
      
      // Close dropdowns individually if click is outside each one
      if (isOutsideLiveScores) {
        setIsDropdownOpen(prev => ({ ...prev, 'live-scores': false }));
      }
      if (isOutsideSeries) {
        setIsDropdownOpen(prev => ({ ...prev, 'series': false }));
      }
      if (isOutsideTeams) {
        setIsDropdownOpen(prev => ({ ...prev, 'teams': false }));
      }
      if (isOutsideNews) {
        setIsDropdownOpen(prev => ({ ...prev, 'news': false }));
      }
      if (isOutsideRankings) {
        setIsDropdownOpen(prev => ({ ...prev, 'rankings': false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Simulate live matches count (in a real app, this would come from an API)
  useEffect(() => {
    // This would be replaced with actual API call
    setLiveMatchesCount(3);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-950 to-black text-gray-100 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-emerald-500 text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
              CB
            </div>
            <span className="text-2xl font-bold tracking-tight">CrickBuddy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all duration-200 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
              </svg>
              Home
            </Link>
            
            <div className="relative" ref={liveScoresDropdownRef}>
              <button 
                onClick={() => toggleDropdown('live-scores')} 
                className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all duration-200 flex items-center"
              >
                <div className="flex items-center">
                  <span className="relative flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  Live Scores
                </div>
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
                {liveMatchesCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {liveMatchesCount}
                  </span>
                )}
              </button>
              {isDropdownOpen['live-scores'] && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                  <Link href="/formats/live" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                    Live Matches
                  </Link>
                  <Link href="/formats/upcoming" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors flex items-center">
                    <svg className="w-5 h-5 text-cyan-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Upcoming Matches
                  </Link>
                  <Link href="/formats/recent" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors flex items-center">
                    <svg className="w-5 h-5 text-emerald-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Recent Matches
                  </Link>
                </div>
              )}
            </div>

            <div className="relative" ref={seriesDropdownRef}>
              <button 
                onClick={() => toggleDropdown('series')} 
                className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Series
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isDropdownOpen['series'] && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                  <Link href="/series" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors">
                    Current Series
                  </Link>
                  <Link href="/series/archive" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors">
                    Series Archive
                  </Link>
                </div>
              )}
            </div>

            <div className="relative" ref={teamsDropdownRef}>
              <button 
                onClick={() => toggleDropdown('teams')} 
                className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Teams
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isDropdownOpen['teams'] && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                  <Link href="/teams" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors">
                    International Teams
                  </Link>
                  <Link href="/teams/domestic" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors">
                    Domestic Teams
                  </Link>
                </div>
              )}
            </div>

            <div className="relative" ref={newsDropdownRef}>
              <button 
                onClick={() => toggleDropdown('news')} 
                className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                News
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isDropdownOpen['news'] && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                  <Link href="/news/latest" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors">
                    Latest News
                  </Link>
                  <Link href="/news/match-reports" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors">
                    Match Reports
                  </Link>
                  <Link href="/news/features" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors">
                    Features
                  </Link>
                </div>
              )}
            </div>

            <div className="relative" ref={rankingsDropdownRef}>
              <button 
                onClick={() => toggleDropdown('rankings')} 
                className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Rankings
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isDropdownOpen['rankings'] && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                  <Link href="/rankings" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors">
                    Men's Rankings
                  </Link>
                  <Link href="/rankings/women" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors">
                    Women's Rankings
                  </Link>
                </div>
              )}
            </div>

            <Link href="/records" className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all duration-200 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Records
            </Link>
          </div>

          {/* Search and User Profile */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
            
            <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-semibold px-4 py-2 rounded-full text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Login
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-200 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className="text-gray-200 block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-800 transition-colors flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
              </svg>
              Home
            </Link>
            
            <div className="border-t border-slate-800 pt-2">
              <button 
                onClick={() => toggleDropdown('mobile-live')} 
                className="text-gray-200 w-full text-left block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-800 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center">
                  <span className="relative flex h-3 w-3 mr-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  Live Scores
                </div>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isDropdownOpen['mobile-live'] ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
                </svg>
              </button>
              {isDropdownOpen['mobile-live'] && (
                <div className="bg-slate-800 rounded-lg mt-2 ml-4 mr-2 border border-slate-700">
                  <Link href="/formats/live" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors rounded-t-lg" onClick={() => setIsMobileMenuOpen(false)}>
                    Live Matches
                  </Link>
                  <Link href="/formats/upcoming" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    Upcoming Matches
                  </Link>
                  <Link href="/formats/recent" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors rounded-b-lg" onClick={() => setIsMobileMenuOpen(false)}>
                    Recent Matches
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/series" 
              className="text-gray-200 block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-800 transition-colors flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Series
            </Link>

            <Link 
              href="/teams" 
              className="text-gray-200 block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-800 transition-colors flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Teams
            </Link>

            <Link 
              href="/news" 
              className="text-gray-200 block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-800 transition-colors flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              News
            </Link>

            <div className="border-t border-slate-800 pt-2">
              <button 
                onClick={() => toggleDropdown('mobile-rankings')} 
                className="text-gray-200 w-full text-left block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-800 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Rankings
                </div>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isDropdownOpen['mobile-rankings'] ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}></path>
                </svg>
              </button>
              {isDropdownOpen['mobile-rankings'] && (
                <div className="bg-slate-800 rounded-lg mt-2 ml-4 mr-2 border border-slate-700">
                  <Link href="/rankings" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors rounded-t-lg" onClick={() => setIsMobileMenuOpen(false)}>
                    Men's Rankings
                  </Link>
                  <Link href="/rankings/women" className="block px-4 py-3 text-sm text-gray-200 hover:bg-slate-700 transition-colors rounded-b-lg" onClick={() => setIsMobileMenuOpen(false)}>
                    Women's Rankings
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/records" 
              className="text-gray-200 block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-800 transition-colors flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Records
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;