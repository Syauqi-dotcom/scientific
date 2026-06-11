import React, { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { GitBranch, GitCommit, Star, Users, CalendarDays } from 'lucide-react';
import profileData from '../../content/profile.json';
import { ScrollReveal } from '../../utils/useScrollReveal';

const StatCard = ({ icon: Icon, value, title, subtitle }) => (
    <div className="bg-white rounded-xl border border-[#16161D]/10 p-5 flex items-start gap-4 shadow-sm hover:shadow-md hover:border-[#16161D]/20 transition-all">
        <div className="p-2.5 bg-[#A3785B]/10 text-[#A3785B] rounded-full border border-[#A3785B]/20 shrink-0 mt-0.5">
            <Icon size={18} strokeWidth={1.5} />
        </div>
        <div className="flex flex-col">
            <span className="text-xl font-bold text-[#16161D] leading-none mb-1.5">{value}</span>
            <span className="text-sm font-medium text-[#16161D] mb-1">{title}</span>
            <span className="text-xs text-[#16161D]/60 font-light leading-relaxed max-w-[140px]">{subtitle}</span>
        </div>
    </div>
);

const GithubSection = () => {
    const githubUrl = profileData.socials.github;
    const username = githubUrl.split('/').pop();

    const [stats, setStats] = useState({
        repos: '...',
        contributions: '...',
        stars: '...',
        collaborations: '...',
    });

    useEffect(() => {
        let isMounted = true;
        
        const fetchGitHubStats = async () => {
            try {
                // Fetch basic user stats (repos & followers)
                const userRes = await fetch(`https://api.github.com/users/${username}`);
                const userData = await userRes.json();
                
                // Fetch repositories to calculate total stars
                const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
                const reposData = await reposRes.json();
                const totalStars = Array.isArray(reposData) 
                    ? reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
                    : 0;

                // Fetch total contributions over the last year
                const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
                const contribData = await contribRes.json();
                const totalContributions = contribData?.total?.lastYear || 0;

                if (isMounted) {
                    setStats({
                        repos: userData.public_repos || 0,
                        contributions: `${totalContributions}+`,
                        stars: `${totalStars}+`,
                        collaborations: `${userData.followers || 0}+`,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch Github stats:", error);
                if (isMounted) {
                    setStats({
                        repos: '25+',
                        contributions: '500+',
                        stars: '150+',
                        collaborations: '10+',
                    });
                }
            }
        };

        fetchGitHubStats();
        
        return () => {
            isMounted = false;
        };
    }, [username]);

    return (
        <section id="github" className="py-16 px-6 border-b border-[#16161D]/5 bg-[#FAFAF9]/30">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* Header */}
                <ScrollReveal delay={0} direction="up">
                    <div>
                        <h2 className="font-serif text-2xl md:text-3xl text-[#16161D] mb-2">Github</h2>
                        <p className="text-[#16161D]/60 text-sm font-light mb-4">Contributions on Github</p>
                        <div className="w-16 h-0.5 bg-[#A3785B]/60 rounded-full"></div>
                    </div>
                </ScrollReveal>

                {/* Stats Cards
                <ScrollReveal delay={0.1} direction="up">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard 
                        icon={GitBranch}
                        value={stats.repos}
                        title="Public Repo"
                        subtitle="Open source projects"
                    />
                    <StatCard 
                        icon={GitCommit}
                        value={stats.contributions}
                        title="Contributions"
                        subtitle="Commits across all repositories"
                    />
                    <StatCard 
                        icon={Star}
                        value={stats.stars}
                        title="Stars Earned"
                        subtitle="Recognition from the community"
                    />
                    <StatCard 
                        icon={Users}
                        value={stats.collaborations}
                        title="Collaborations"
                        subtitle="Projects with other developers"
                    />
                </div>
                </ScrollReveal> */}

                {/* Calendar Container */}
                <ScrollReveal delay={0.2} direction="up">
                <div className="bg-white rounded-2xl border border-[#16161D]/10 p-6 md:p-8 shadow-sm flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-[#A3785B]/10 text-[#A3785B] rounded-lg border border-[#A3785B]/20">
                            <CalendarDays size={18} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-medium text-[#16161D]">Activity Calendar</h3>
                    </div>

                    <div className="w-full overflow-x-auto hide-scrollbar flex justify-center mb-6">
                        <div className="min-w-max pb-2">
                            <GitHubCalendar 
                                username={username} 
                                blockSize={12}
                                blockMargin={4}
                                fontSize={12}
                                theme={{
                                    light: ['#ebedf0', '#fcece7', '#f4c7b8', '#e9a18a', '#d97f64'],
                                }}
                                tooltips={{
                                    activity: {
                                        text: (activity) => `${activity.count} contributions on ${activity.date}`
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
                </ScrollReveal>

            </div>
        </section>
    );
};

export default GithubSection;
