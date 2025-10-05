import axios from 'axios';
import Link from 'next/link';
import MatchCard from '../components/MatchCard';
import Navbar from '../components/Navbar';

type Match = any;

// Helper function to determine if a match is actually live
const isActuallyLive = (match: any) => {
  if (match.isLive) return true;
  
  const status = match?.status || '';
  const lowerStatus = status.toLowerCase();
  
  // Check for live status patterns
  return lowerStatus.includes('live') ||
         lowerStatus.includes('in progress') ||
         lowerStatus.includes('innings break') ||
         lowerStatus.includes('rain delay') ||
         lowerStatus.includes('tea break') ||
         lowerStatus.includes('lunch break') ||
         lowerStatus.includes('drinks break');
};

// Helper function to determine if a match is actually completed
const isActuallyCompleted = (match: any) => {
  const status = match?.status || '';
  const lowerStatus = status.toLowerCase();
  
  // Check for completed status patterns
  return lowerStatus.includes('complete') ||
         lowerStatus.includes('finished') ||
         lowerStatus.includes('won') ||
         lowerStatus.includes('abandon') ||
         lowerStatus.includes('cancel') ||
         lowerStatus.includes('no result') ||
         lowerStatus.includes('tied') ||
         status === 'COMPLETED' ||
         status === 'ABANDONED' ||
         status === 'CANCELLED';
};

export default function Home({ liveMatches, upcomingMatches, recentMatches }: {
  liveMatches: Match[],
  upcomingMatches: Match[],
  recentMatches: Match[]
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-black">
        {/* Neon circle overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-emerald-400/30 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-cyan-400/30 rounded-full"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-sm font-medium">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
                Live Cricket Updates
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Cricket
              <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Live Central
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Real-time scores, live commentary & analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/formats/live" className="group bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-violet-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></span>
                  Watch Live Matches
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link href="/formats/upcoming" className="group bg-slate-800 hover:bg-slate-700 text-gray-200 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 border border-slate-700 shadow-lg">
                <span className="flex items-center">
                  📅 Upcoming Matches
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Neon cricket ball */}
        <div className="absolute bottom-10 right-10 w-16 h-16 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-violet-500 rounded-full animate-bounce"></div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats Cards */}
        <section className="mb-16 -mt-16 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-slate-800 rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-700">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{liveMatches?.length || 0}</span>
                </div>
              </div>
              <h3 className="text-3xl font-black text-gray-200 mb-2">{liveMatches?.length || 0}</h3>
              <p className="text-gray-400 font-semibold text-lg">Live Now</p>
              <div className="mt-4 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>

            <div className="group bg-slate-800 rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-700">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-black text-gray-200 mb-2">{upcomingMatches?.length || 0}</h3>
              <p className="text-gray-400 font-semibold text-lg">Upcoming</p>
              <div className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>

            <div className="group bg-slate-800 rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-700">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-black text-gray-200 mb-2">{recentMatches?.length || 0}</h3>
              <p className="text-gray-400 font-semibold text-lg">Completed</p>
              <div className="mt-4 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>

            <div className="group bg-slate-800 rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-700">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-black text-gray-200 mb-2">12</h3>
              <p className="text-gray-400 font-semibold text-lg">Active Series</p>
              <div className="mt-4 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>
        </section>

        {/* Live Matches Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-2 h-16 bg-gradient-to-b from-red-500 to-red-600 rounded-full mr-6"></div>
                <div className="absolute top-0 left-0 w-2 h-4 bg-red-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <div className="flex items-center space-x-2 mr-4">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">LIVE</span>
                </div>
                <h2 className="text-4xl font-black text-gray-200 mb-2">
                  Live Cricket Matches
                </h2>
                <p className="text-gray-400 text-lg">Experience the thrill of live cricket action</p>
              </div>
            </div>
            <Link href="/formats/live" className="group bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-violet-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
              <span className="flex items-center">
                View All Live
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
          <div className="grid gap-6">
            {liveMatches && liveMatches.length > 0 ? (
              liveMatches
                .filter((match: any) => {
                  // Filter out matches with completely missing essential data
                  const hasValidTeams = (match?.teams && match.teams.length >= 2) ||
                                       (match?.raw?.matchInfo?.team1 && match?.raw?.matchInfo?.team2);
                  const hasValidId = match?.matchId || match?._id;
                  
                  // Filter out completed matches that are incorrectly marked as live
                  const isCompleted = isActuallyCompleted(match);
                  
                  return hasValidTeams && hasValidId && !isCompleted;
                })
                .map((match: any) => (
                  <Link key={match.matchId || match._id || Math.random()} href={`/matches/${match.matchId || 'unknown'}`}>
                    <div className="block cursor-pointer mb-6">
                      <MatchCard match={match} isLive={true} />
                    </div>
                  </Link>
                ))
            ) : (
              <div className="bg-slate-800 rounded-3xl shadow-2xl p-16 text-center border border-slate-700">
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-900 to-red-800 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">⚡</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mb-4">No Live Matches Right Now</h3>
                <p className="text-gray-400 mb-8 text-lg max-w-md mx-auto">
                  The cricket world is taking a breather. Check back soon for live action or explore upcoming matches!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/formats/upcoming" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    View Upcoming Matches
                  </Link>
                  <Link href="/formats/recent" className="bg-slate-700 hover:bg-slate-600 text-gray-200 px-8 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg border border-slate-600">
                    Recent Results
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Upcoming Matches Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center">
              <div className="w-2 h-16 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-6"></div>
              <div>
                <div className="flex items-center mb-2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">UPCOMING</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                  </div>
                </div>
                <h2 className="text-4xl font-black text-gray-200 mb-2">
                  Upcoming Matches
                </h2>
                <p className="text-gray-400 text-lg">Don't miss the upcoming cricket action</p>
              </div>
            </div>
            <Link href="/formats/upcoming" className="group bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-violet-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
              <span className="flex items-center">
                View All Upcoming
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
          <div className="grid gap-6">
            {upcomingMatches && upcomingMatches.length > 0 ? (
              upcomingMatches
                .filter((match: any) => {
                  // Filter out matches with completely missing essential data
                  const hasValidTeams = (match?.teams && match.teams.length >= 2) ||
                                       (match?.raw?.matchInfo?.team1 && match?.raw?.matchInfo?.team2);
                  const hasValidId = match?.matchId || match?._id;
                  return hasValidTeams && hasValidId;
                })
                .map((match: any) => (
                  <Link key={match.matchId || match._id || Math.random()} href={`/matches/${match.matchId || 'unknown'}`}>
                    <div className="block cursor-pointer mb-6">
                      <MatchCard match={match} isUpcoming={true} />
                    </div>
                  </Link>
                ))
            ) : (
              <div className="bg-slate-800 rounded-2xl shadow-lg p-12 text-center border border-slate-700">
                <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">📅</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-200 mb-2">No Upcoming Matches</h3>
                <p className="text-gray-400">Stay tuned for match schedules</p>
              </div>
            )}
          </div>
        </section>

        {/* Recent Matches Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center">
              <div className="w-2 h-16 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-6"></div>
              <div>
                <div className="flex items-center mb-2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">COMPLETED</span>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-4xl font-black text-gray-200 mb-2">
                  Recent Results
                </h2>
                <p className="text-gray-400 text-lg">Latest match outcomes and highlights</p>
              </div>
            </div>
            <Link href="/formats/recent" className="group bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-violet-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
              <span className="flex items-center">
                View All Results
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
          <div className="grid gap-6">
            {recentMatches && recentMatches.length > 0 ? (
              recentMatches
                .filter((match: any) => {
                  // Filter out matches with completely missing essential data
                  const hasValidTeams = (match?.teams && match.teams.length >= 2) ||
                                       (match?.raw?.matchInfo?.team1 && match?.raw?.matchInfo?.team2);
                  const hasValidId = match?.matchId || match?._id;
                  return hasValidTeams && hasValidId;
                })
                .map((match: any) => {
                  const matchActuallyLive = isActuallyLive(match);
                  const matchActuallyCompleted = isActuallyCompleted(match) || 
                                    match.status === 'Complete' || 
                                    match.status === 'COMPLETED' || 
                                    match.status === 'ABANDONED' || 
                                    match.status === 'CANCELLED' || 
                                    match.status.includes('won') || 
                                    match.status.includes('Win') || 
                                    match.status.includes('win');
                  const matchActuallyUpcoming = !matchActuallyLive && !matchActuallyCompleted;

                  return (
                    <Link key={match.matchId || match._id || Math.random()} href={`/matches/${match.matchId || 'unknown'}`}>
                      <div className="block cursor-pointer mb-6">
                        <MatchCard
                          match={match}
                          isLive={matchActuallyLive}
                          isUpcoming={matchActuallyUpcoming}
                          isCompleted={matchActuallyCompleted}
                        />
                      </div>
                    </Link>
                  );
                })
            ) : (
              <div className="bg-slate-800 rounded-2xl shadow-lg p-12 text-center border border-slate-700">
                <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-200 mb-2">No Recent Results</h3>
                <p className="text-gray-400">Recent match results will appear here</p>
              </div>
            )}
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/news" className="group bg-slate-800 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-700">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📰</span>
              </div>
              <h3 className="font-bold text-gray-200 mb-2">Cricket News</h3>
              <p className="text-sm text-gray-400">Latest updates & stories</p>
            </Link>
            <Link href="/series" className="group bg-slate-800 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-700">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="font-bold text-gray-200 mb-2">Series</h3>
              <p className="text-sm text-gray-400">Tournaments & leagues</p>
            </Link>
            <Link href="/teams" className="group bg-slate-800 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-700">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="font-bold text-gray-200 mb-2">Teams</h3>
              <p className="text-sm text-gray-400">Squad & player info</p>
            </Link>
            <Link href="/rankings" className="group bg-slate-800 rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-700">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="font-bold text-gray-200 mb-2">Rankings</h3>
              <p className="text-sm text-gray-400">ICC team & player rankings</p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-200 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CrickBuddy</h3>
              <p className="text-gray-400">Your ultimate destination for live cricket scores and updates.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/formats/live" className="hover:text-white transition">Live Scores</Link></li>
                <li><Link href="/series" className="hover:text-white transition">Series</Link></li>
                <li><Link href="/teams" className="hover:text-white transition">Teams</Link></li>
                <li><Link href="/rankings" className="hover:text-white transition">Rankings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/news" className="hover:text-white transition">Cricket News</Link></li>
                <li><Link href="/records" className="hover:text-white transition">Records</Link></li>
                <li><Link href="/players" className="hover:text-white transition">Player Stats</Link></li>
                <li><Link href="/venues" className="hover:text-white transition">Venues</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center hover:from-emerald-600 hover:to-cyan-600 transition">
                  <span className="text-sm">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center hover:from-cyan-600 hover:to-blue-600 transition">
                  <span className="text-sm">t</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-violet-500 to-emerald-500 rounded-full flex items-center justify-center hover:from-violet-600 hover:to-emerald-600 transition">
                  <span className="text-sm">y</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2024 CrickBuddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
    console.log('Fetching data from API URL:', apiUrl);

    // Fetch live matches
    console.log('Fetching live matches...');
    const liveRes = await axios.get(`${apiUrl}/api/matches/live`);
    const liveMatches = Array.isArray(liveRes.data) ? liveRes.data : [];
    console.log('Live matches response count:', liveMatches.length);

    // Fetch upcoming matches
    console.log('Fetching upcoming matches...');
    const upcomingRes = await axios.get(`${apiUrl}/api/matches/upcoming?limit=5`);
    const upcomingMatches = Array.isArray(upcomingRes.data) ? upcomingRes.data : [];
    console.log('Upcoming matches response count:', upcomingMatches.length);

    // Fetch recent matches
    console.log('Fetching recent matches...');
    const recentRes = await axios.get(`${apiUrl}/api/matches/recent?limit=5`);
    const recentMatches = Array.isArray(recentRes.data) ? recentRes.data : [];
    console.log('Recent matches response count:', recentMatches.length);

    return {
      props: {
        liveMatches,
        upcomingMatches,
        recentMatches
      }
    };
  } catch (error) {
    console.error('Error fetching matches:', error);
    return {
      props: {
        liveMatches: [],
        upcomingMatches: [],
        recentMatches: []
      }
    };
  }
}