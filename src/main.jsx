import React, {useMemo, useState} from "react";
import {createRoot} from "react-dom/client";
import {
  Activity, ArrowRight, BarChart3, Bell, BriefcaseBusiness, Check, ChevronDown,
  CircleHelp, ClipboardCheck, Copy, FileText, Gauge, Github, Home, LayoutDashboard,
  Lightbulb, Menu, Moon, MoreHorizontal, Play, Plus, Search, Settings, ShieldCheck,
  Sparkles, Sun, Target, TrendingUp, Upload, UserRound, WandSparkles, X, Zap
} from "lucide-react";
import "./styles.css";

const demoSkills=["C++","Python","React","JavaScript","SQL","Git","Data Structures","REST APIs","FastAPI","Machine Learning"];
const missing=["Docker","AWS","PostgreSQL","Unit Testing"];
const jobs=[
  {company:"Nova Systems", role:"Software Engineer Intern", match:94, skills:["C++","React","DSA","Git"], missing:["Docker"]},
  {company:"CloudPeak", role:"Frontend Developer Intern", match:88, skills:["React","JavaScript","REST APIs"], missing:["TypeScript","Testing"]},
  {company:"FinEdge", role:"Technology Analyst Intern", match:82, skills:["Python","SQL","Git"], missing:["AWS","PostgreSQL"]}
];

function App(){
  const [page,setPage]=useState("Dashboard");
  const [dark,setDark]=useState(true);
  const [sidebar,setSidebar]=useState(true);
  const [resume,setResume]=useState(null);
  const [jd,setJd]=useState("");
  const [analyzed,setAnalyzed]=useState(true);
  const [toast,setToast]=useState("");
  const [copied,setCopied]=useState(false);

  const nav=[
    ["Dashboard",LayoutDashboard],["Resume Analyzer",FileText],["Job Matcher",Target],
    ["ATS Analyzer",Gauge],["Resume Improver",WandSparkles],["Interview Prep",Lightbulb],
    ["Skill Roadmap",TrendingUp],["Job Comparison",BriefcaseBusiness]
  ];
  const notify=(m)=>{setToast(m);setTimeout(()=>setToast(""),2200)};
  const score=useMemo(()=>jd.length>30?91:87,[jd]);

  const handleUpload=(e)=>{
    const f=e.target.files?.[0];
    if(f){setResume(f);notify("Resume loaded successfully");}
  };
  const analyze=()=>{setAnalyzed(true);notify("Analysis completed");};
  const copyText=()=>{
    navigator.clipboard?.writeText("Developed a responsive React web application with reusable components and a mobile-first user experience.");
    setCopied(true); setTimeout(()=>setCopied(false),1500);
  };

  return <div className={dark?"app dark":"app light"}>
    <header className="topbar">
      <div className="brand"><div className="brandmark"><Sparkles size={18}/></div><span>ResumeLens <b>Pro</b></span></div>
      <div className="top-actions">
        <button className="iconbtn" onClick={()=>notify("No new notifications")}><Bell size={18}/><i/></button>
        <button className="iconbtn" onClick={()=>setDark(!dark)}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button>
        <div className="profile"><div className="avatar">SD</div><div><strong>Sumit Dahiwal</strong><small>Candidate</small></div><ChevronDown size={15}/></div>
      </div>
    </header>

    <div className="layout">
      <aside className={sidebar?"sidebar":"sidebar collapsed"}>
        <button className="collapse" onClick={()=>setSidebar(!sidebar)}><Menu size={19}/></button>
        <div className="nav-section">{sidebar&&<span>WORKSPACE</span>}
          {nav.map(([n,I])=><button key={n} className={page===n?"navitem active":"navitem"} onClick={()=>setPage(n)}><I size={18}/>{sidebar&&<span>{n}</span>}</button>)}
        </div>
        <div className="sidebar-bottom">
          <button className="navitem" onClick={()=>notify("Help center coming soon")}><CircleHelp size={18}/>{sidebar&&<span>Help Center</span>}</button>
          <button className="navitem" onClick={()=>notify("Settings panel coming soon")}><Settings size={18}/>{sidebar&&<span>Settings</span>}</button>
          {sidebar&&<div className="upgrade"><Zap size={17}/><div><b>Pro workspace</b><small>All career insights unlocked</small></div></div>}
        </div>
      </aside>

      <main className="main">
        <div className="pagehead">
          <div><p className="eyebrow">CAREER INTELLIGENCE</p><h1>{page}</h1><p className="sub">{page==="Dashboard"?"See how your profile performs against your target roles.":"Turn your resume data into clear, actionable career decisions."}</p></div>
          <button className="primary" onClick={()=>setPage("Resume Analyzer")}><Plus size={17}/> New analysis</button>
        </div>

        {page==="Dashboard" && <Dashboard score={score} setPage={setPage} resume={resume} notify={notify}/>}
        {page==="Resume Analyzer" && <ResumeAnalyzer resume={resume} handleUpload={handleUpload} analyze={analyze} analyzed={analyzed} notify={notify}/>}
        {page==="Job Matcher" && <JobMatcher jd={jd} setJd={setJd} analyze={analyze} score={score}/>}
        {page==="ATS Analyzer" && <ATSAnalyzer/>}
        {page==="Resume Improver" && <Improver copyText={copyText} copied={copied}/>}
        {page==="Interview Prep" && <InterviewPrep/>}
        {page==="Skill Roadmap" && <Roadmap/>}
        {page==="Job Comparison" && <Comparison/>}
      </main>
    </div>
    {toast&&<div className="toast"><Check size={17}/>{toast}</div>}
  </div>
}

function Dashboard({score,setPage,resume,notify}){
 return <div className="content">
   <div className="hero-card">
     <div><span className="pill"><Sparkles size={14}/> AI CAREER SNAPSHOT</span><h2>Your resume is <em>strong</em> for software roles.</h2><p>You've built a solid technical profile. A few targeted improvements can push your match rate even higher.</p><button className="secondary" onClick={()=>setPage("Job Matcher")}>Run job match <ArrowRight size={16}/></button></div>
     <div className="score-ring"><div><strong>{score}</strong><small>/100</small></div><span>Resume score</span></div>
   </div>
   <div className="grid4">
     <Metric title="Job match" value={score+"%"} delta="+6.4%" icon={Target}/>
     <Metric title="ATS readiness" value="91" delta="+4.1%" icon={Gauge}/>
     <Metric title="Skills matched" value="18/22" delta="+3" icon={ShieldCheck}/>
     <Metric title="Profile strength" value="A-" delta="+8.2%" icon={TrendingUp}/>
   </div>
   <div className="twocol">
     <section className="card">
       <div className="cardhead"><div><h3>Target role analysis</h3><p>Software Engineer Intern</p></div><MoreHorizontal size={19}/></div>
       <div className="bars"><Bar label="Technical skills" value={92}/><Bar label="Keywords" value={89}/><Bar label="Projects" value={85}/><Bar label="Experience" value={72}/></div>
       <button className="linkbtn" onClick={()=>setPage("Job Matcher")}>View full analysis <ArrowRight size={15}/></button>
     </section>
     <section className="card">
       <div className="cardhead"><div><h3>Priority improvements</h3><p>Quick wins for your next application</p></div><Lightbulb size={19}/></div>
       {["Add 2 measurable project outcomes","Mention REST API testing experience","Add Docker to skills after practice"].map((x,i)=><div className="todo" key={x}><span>{i+1}</span><div><b>{x}</b><small>{i===0?"High impact":"Medium impact"}</small></div><ArrowRight size={15}/></div>)}
     </section>
   </div>
   <section className="card">
     <div className="cardhead"><div><h3>Recent job matches</h3><p>Roles you are most prepared for</p></div><button className="ghost" onClick={()=>setPage("Job Comparison")}>Compare jobs</button></div>
     <div className="jobtable">{jobs.map(j=><div className="jobrow" key={j.company}><div className="companylogo">{j.company[0]}</div><div className="jobname"><b>{j.role}</b><small>{j.company}</small></div><div className="match"><b>{j.match}%</b><small>match</small></div><span className="tag">{j.match>90?"Excellent":j.match>85?"Strong":"Good"}</span><ArrowRight size={16}/></div>)}</div>
   </section>
 </div>
}
function Metric({title,value,delta,icon:I}){return <div className="metric"><div className="metricicon"><I size={18}/></div><small>{title}</small><strong>{value}</strong><span>↑ {delta} this week</span></div>}
function Bar({label,value}){return <div className="bar"><div><span>{label}</span><b>{value}%</b></div><div className="track"><i style={{width:value+"%"}}/></div></div>}

function ResumeAnalyzer({resume,handleUpload,analyze,analyzed,notify}){
 return <div className="content">
   <section className="card upload-card">
     <div className="uploadbox"><div className="uploadicon"><Upload size={22}/></div><h3>{resume?resume.name:"Drop your resume here"}</h3><p>PDF or DOCX • Max 5 MB</p><label className="primary"><Upload size={16}/> Choose file<input type="file" accept=".pdf,.doc,.docx" onChange={handleUpload}/></label></div>
   </section>
   {analyzed&&<div className="analysis-grid"><section className="card"><div className="cardhead"><div><h3>Resume health</h3><p>Browser-based analysis</p></div><span className="status good"><Check size={14}/> Strong</span></div><div className="bigscore"><strong>87</strong><span>/100</span></div><div className="bars"><Bar label="Content quality" value={90}/><Bar label="Keyword coverage" value={84}/><Bar label="Structure" value={91}/><Bar label="Readability" value={88}/></div></section><section className="card"><div className="cardhead"><div><h3>Detected skills</h3><p>10 core skills identified</p></div></div><div className="skillcloud">{demoSkills.map(s=><span className="skill" key={s}><Check size={13}/>{s}</span>)}</div><button className="secondary full" onClick={()=>notify("Skill profile saved locally")}>Save skill profile</button></section></div>}
 </div>
}
function JobMatcher({jd,setJd,analyze,score}){return <div className="content"><div className="input-grid"><section className="card"><div className="cardhead"><div><h3>Your resume</h3><p>Currently loaded profile</p></div><Check className="ok" size={18}/></div><div className="resume-mini"><div className="mini-avatar">SD</div><div><b>Sumit Dahiwal</b><small>Computer Engineering • Software Developer</small><small>10 technical skills • 4 projects</small></div></div></section><section className="card"><div className="cardhead"><div><h3>Job description</h3><p>Paste the role you want to target</p></div></div><textarea value={jd} onChange={e=>setJd(e.target.value)} placeholder="Paste a job description here..."/> <div className="textareafoot"><span>{jd.length} characters</span><button className="primary" onClick={analyze}><Sparkles size={16}/> Analyze match</button></div></section></div><section className="hero-card match-result"><div><span className="pill"><Target size={14}/> MATCH RESULT</span><h2>{score}% <em>job match</em></h2><p>Your profile is highly aligned. Focus on the missing skills below to strengthen this application.</p></div><div className="score-ring small"><div><strong>{score}</strong><small>%</small></div><span>Match</span></div></section><div className="twocol"><section className="card"><div className="cardhead"><div><h3>Matched keywords</h3><p>Found in your resume and the role</p></div></div><div className="skillcloud">{["C++","Python","React","Git","DSA","REST APIs","SQL","JavaScript"].map(x=><span className="skill green" key={x}><Check size={13}/>{x}</span>)}</div></section><section className="card"><div className="cardhead"><div><h3>Missing skills</h3><p>Prioritize these before applying</p></div></div><div className="skillcloud">{missing.map(x=><span className="skill warn" key={x}>+ {x}</span>)}</div></section></div></div>}
function ATSAnalyzer(){return <div className="content"><section className="card atshead"><div><span className="pill"><ShieldCheck size={14}/> ATS CHECK</span><h2>91/100 <em>ATS ready</em></h2><p>Your resume is structured for automated screening systems.</p></div><div className="bigscore"><strong>91</strong><span>/100</span></div></section><div className="grid4"><Metric title="Sections" value="10/10" delta="+0.0%" icon={ClipboardCheck}/><Metric title="Keywords" value="89%" delta="+6.2%" icon={Search}/><Metric title="Formatting" value="96%" delta="+2.0%" icon={FileText}/><Metric title="Readability" value="88%" delta="+4.8%" icon={Activity}/></div><section className="card checks">{["Contact details are machine-readable","Standard section headings detected","No critical formatting conflicts","Strong keyword density","Action verbs used consistently","Project bullets can use more metrics"].map((x,i)=><div className="checkrow" key={x}><span className={i===5?"warning":"check"}>{i===5?"!":"✓"}</span><div><b>{x}</b><small>{i===5?"Improvement suggested":"Passed"} </small></div><span className="checkstate">{i===5?"Review":"Passed"}</span></div>)}</section></div>}
function Improver({copyText,copied}){return <div className="content"><section className="card"><div className="cardhead"><div><h3>AI Resume Improver</h3><p>Turn generic bullets into impact-focused achievements.</p></div><span className="pill"><Sparkles size={14}/> SMART REWRITE</span></div><div className="rewrite"><div><label>Original</label><p>Made a website using React.</p></div><ArrowRight className="rewritearrow"/><div className="improved"><label>ResumeLens suggestion</label><p>Developed a responsive React web application with reusable components and a mobile-first user experience.</p><button className="ghost" onClick={copyText}>{copied?<Check size={15}/>:<Copy size={15}/>} {copied?"Copied":"Copy suggestion"}</button></div></div></section><div className="twocol"><section className="card"><h3>Why this is stronger</h3><div className="reason"><Check/> Uses a stronger action verb</div><div className="reason"><Check/> Names the technology</div><div className="reason"><Check/> Shows technical scope</div><div className="reason"><Check/> Communicates product quality</div></section><section className="card"><h3>More improvements</h3><div className="suggestion">Add a measurable result <ArrowRight/></div><div className="suggestion">Mention your user impact <ArrowRight/></div><div className="suggestion">Connect the bullet to a business goal <ArrowRight/></div></section></div></div>}
function InterviewPrep(){const qs=["Explain how you used React in your projects.","What is the difference between a stack and a queue?","How would you design a REST API for a student platform?","Tell me about a technical challenge you solved.","Why are you interested in this software engineering role?"];return <div className="content"><section className="hero-card"><div><span className="pill"><Lightbulb size={14}/> AI INTERVIEW COACH</span><h2>Prepare for the questions your <em>resume invites.</em></h2><p>Practice technical, project and behavioral questions tailored to your target role.</p></div><button className="secondary"><Play size={16}/> Start practice</button></section><section className="card questions">{qs.map((q,i)=><div className="question" key={q}><span>0{i+1}</span><div><b>{q}</b><small>{i<3?"Technical":"Behavioral"} • {i%2?"Medium":"Easy"}</small></div><ArrowRight/></div>)}</section></div>}
function Roadmap(){return <div className="content"><section className="card"><div className="cardhead"><div><h3>Your skill roadmap</h3><p>Close the highest-impact gaps first.</p></div><span className="status good">4 priorities</span></div>{missing.map((x,i)=><div className="road" key={x}><div className="roadnum">{i+1}</div><div className="roadmain"><div><b>{x}</b><span>{i===0?"High priority":"Medium priority"}</span></div><small>{["Containerize a React app and learn images, ports and deployment.","Learn IAM, S3 and basic cloud deployment.","Practice relational schemas and PostgreSQL queries.","Add unit tests with Vitest and React Testing Library."][i]}</small><div className="track"><i style={{width:(i===0?32:i===1?18:i===2?42:55)+"%"}}/></div></div><button className="ghost">Open plan</button></div>)}</section></div>}
function Comparison(){return <div className="content"><section className="card comparison"><div className="cardhead"><div><h3>Job comparison</h3><p>Choose where your profile is strongest.</p></div><button className="primary"><Plus size={16}/> Add job</button></div><div className="comparehead"><span>ROLE</span><span>MATCH</span><span>KEY STRENGTH</span><span>GAPS</span><span/></div>{jobs.map(j=><div className="comparerow" key={j.company}><div className="jobname"><div className="companylogo">{j.company[0]}</div><div><b>{j.role}</b><small>{j.company}</small></div></div><strong className="matchbig">{j.match}%</strong><div className="tag">{j.skills.slice(0,2).join(" • ")}</div><small>{j.missing.join(", ")}</small><ArrowRight size={16}/></div>)}</section></div>}
createRoot(document.getElementById("root")).render(<App/>);