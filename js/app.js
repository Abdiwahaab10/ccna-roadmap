import React, { useState, useEffect, useRef } from 'https://esm.sh/react@18?dev';
import { createRoot } from 'https://esm.sh/react-dom@18/client?dev';
import { 
  BookOpen, Calendar, Terminal, CheckCircle, ChevronDown, ChevronUp, 
  Copy, Menu, X, Home, Check, Moon, Sun, ExternalLink, Award, Youtube, 
  Download, Clock, Brain, Search, FileText, Save, RefreshCw, Layers, List, Play, MoreHorizontal
} from 'https://esm.sh/lucide-react@0.263.1?dev';

// --- DATA: Glossary ---
  const glossaryData = [
    { term: "ACL", def: "Access Control List. A set of rules that filter network traffic." },
    { term: "ARP", def: "Address Resolution Protocol. Maps an IP address to a physical MAC address." },
    { term: "DHCP", def: "Dynamic Host Configuration Protocol. Automatically assigns IP addresses to hosts." },
    { term: "DORA", def: "Discover, Offer, Request, Acknowledge. The four steps of DHCP." },
    { term: "DNS", def: "Domain Name System. Translates domain names (google.com) to IP addresses." },
    { term: "Encapsulation", def: "The process of adding headers and trailers to data as it moves down the OSI model." },
    { term: "MAC Address", def: "Media Access Control. A unique hardware address assigned to a NIC." },
    { term: "NAT", def: "Network Address Translation. Translates private IP addresses to a public IP address." },
    { term: "OSPF", def: "Open Shortest Path First. A link-state routing protocol." },
    { term: "PDU", def: "Protocol Data Unit. The name of data at each layer (Segment, Packet, Frame)." },
    { term: "ROAS", def: "Router on a Stick. Using a router to route traffic between VLANs." },
    { term: "SSH", def: "Secure Shell. A protocol for secure remote login." },
    { term: "Subnetting", def: "The process of dividing a single network into smaller sub-networks." },
    { term: "Trunk", def: "A link carrying traffic for multiple VLANs (usually using 802.1Q)." },
    { term: "VLAN", def: "Virtual Local Area Network. Logically grouping devices on the same switch." },
  ];
  
  // --- DATA: Cheatsheet ---
  const cheatsheetData = [
      {
          category: "Basic Configuration",
          commands: [
              { cmd: "enable", desc: "Enter privileged exec mode" },
              { cmd: "configure terminal", desc: "Enter global configuration mode" },
              { cmd: "hostname [name]", desc: "Change the device name" },
              { cmd: "enable secret [pass]", desc: "Set encrypted privilege password" },
              { cmd: "service password-encryption", desc: "Encrypt weak passwords" }
          ]
      },
      {
          category: "Interface Config",
          commands: [
              { cmd: "interface [int]", desc: "Enter interface configuration mode" },
              { cmd: "ip address [ip] [mask]", desc: "Assign IP address" },
              { cmd: "no shutdown", desc: "Bring interface up" },
              { cmd: "description [text]", desc: "Add description to interface" }
          ]
      },
      {
          category: "VLANs & Trunking",
          commands: [
              { cmd: "vlan [id]", desc: "Create a VLAN" },
              { cmd: "name [name]", desc: "Name a VLAN" },
              { cmd: "switchport mode access", desc: "Set port to access mode" },
              { cmd: "switchport access vlan [id]", desc: "Assign port to VLAN" },
              { cmd: "switchport mode trunk", desc: "Set port to trunk mode" }
          ]
      },
      {
          category: "Troubleshooting",
          commands: [
              { cmd: "show running-config", desc: "View active configuration" },
              { cmd: "show ip interface brief", desc: "Summary of interface status" },
              { cmd: "show ip route", desc: "View routing table" },
              { cmd: "show vlan brief", desc: "View VLAN information" },
              { cmd: "ping [ip]", desc: "Test connectivity" }
          ]
      }
  ];
  
  // --- DATA: Quiz ---
  const quizData = [
    { q: "Which layer of the OSI model handles logical addressing (IP)?", options: ["Layer 1 (Physical)", "Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)"], ans: 2 },
    { q: "What is the administrative distance of OSPF?", options: ["90", "100", "110", "120"], ans: 2 },
    { q: "Which command is used to configure a trunk port?", options: ["switchport mode access", "switchport mode trunk", "ip routing", "encapsulation dot1q"], ans: 1 },
    { q: "Which protocol is used to map IP addresses to MAC addresses?", options: ["DNS", "DHCP", "ARP", "ICMP"], ans: 2 },
    { q: "What is the default subnet mask for a Class C address?", options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"], ans: 2 },
  ];
  
  // --- DATA: Resources ---
  const resourcesData = [
    {
      category: "Video Courses",
      items: [
        { title: "Jeremy's IT Lab (Free CCNA Course)", link: "https://www.youtube.com/playlist?list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ", icon: Youtube },
        { title: "NetworkChuck (CCNA Series)", link: "https://www.youtube.com/playlist?list=PLIhvC56v63IJVXv0GGk4OBk7GMP6eZRHh", icon: Youtube },
        { title: "Keith Barker (CBT Nuggets)", link: "https://www.youtube.com/user/Keith6783", icon: Youtube },
      ]
    },
    {
      category: "Tools & Practice",
      items: [
        { title: "Download Cisco Packet Tracer", link: "https://www.netacad.com/courses/packet-tracer", icon: Download },
        { title: "Anki Flashcards (Memorization)", link: "https://apps.ankiweb.net/", icon: Download },
        { title: "Subnetting Practice Game", link: "https://subnettingpractice.com/", icon: ExternalLink },
      ]
    },
    {
      category: "Official Books",
      items: [
        { title: "CCNA 200-301 Official Cert Guide (Odom)", link: "#", icon: BookOpen },
        { title: "31 Days Before your CCNA Exam", link: "#", icon: BookOpen },
      ]
    }
  ];
  
  // --- DATA: Module Content ---
  const modulesData = [
    {
      id: 1,
      title: "Module 1: Aasaaska Shabakadda",
      desc: "Fahamka luuqadda kombiyuutarrada iyo qalabka aasaasiga ah.",
      steps: [
        "Qeexida Network Components (Router, Switch, Firewall, AP)",
        "Network Topologies (Star, Mesh, Hybrid, 2-Tier vs 3-Tier)",
        "OSI Model (7 Layers) - Faham qoto dheer",
        "TCP/IP Model vs OSI Model",
        "Cabling & Physical Layer (Copper, Fiber, Speed/Duplex)"
      ],
      action: "Sawiro OSI model-ka warqad, qor Protocol-yada caanka ah ee lakab kasta (HTTP, IP, MAC)."
    },
    {
      id: 2,
      title: "Module 2: IP Addressing & Subnetting",
      desc: "Barashada IPv4, IPv6 iyo xisaabinta Subnets-ka.",
      steps: [
        "Binary & Hexadecimal Conversion",
        "IPv4 Classes & Private vs Public IP",
        "Subnetting Basics (FLSM) - /24 to /30",
        "VLSM (Variable Length Subnet Mask)",
        "IPv6 Basics & Address Types"
      ],
      action: "Booqo website-yada 'Subnetting Practice', maalin kasta 15 daqiiqo ku bixi xisaabinta."
    },
    {
      id: 3,
      title: "Module 3: Ethernet Switching (L2)",
      desc: "Habaynta Switch-ka Cisco iyo VLANs.",
      steps: [
        "Initial Switch Configuration (Console, SSH)",
        "VLANs (Virtual LANs) Abuurista iyo maamulka",
        "Trunking (802.1Q) & Native VLANs",
        "Spanning Tree Protocol (STP) Basics",
        "EtherChannel (LACP) Configuration"
      ],
      action: "Samee Lab leh 3 Switch, abuur VLANs 10, 20, 30 oo isku xir (Trunking)."
    },
    {
      id: 4,
      title: "Module 4: Routing (L3)",
      desc: "Isku xirka shabakadaha kala duwan iyo Routing Protocols.",
      steps: [
        "Routing Table Analysis (AD & Metric)",
        "Static Routing & Default Routes",
        "Inter-VLAN Routing (Router-on-a-Stick & SVI)",
        "Dynamic Routing: OSPFv2 (Single Area)",
        "First Hop Redundancy (HSRP)"
      ],
      action: "Isku xir Router iyo Switch, samee ROAS si VLAN-yadu u wada hadlaan."
    },
    {
      id: 5,
      title: "Module 5: IP Services",
      desc: "Adeegyada muhiimka ah ee shabakadda (DHCP, DNS, NAT).",
      steps: [
        "DHCP Server Configuration on Router",
        "DNS Concepts & Configuration",
        "NAT (Static, Dynamic) & PAT (Overload)",
        "NTP (Time Synchronization)"
      ],
      action: "Ka dhig Router-kaaga DHCP server, samee PAT si PC-yadu internet u galaan (Simulation)."
    },
    {
      id: 6,
      title: "Module 6: Security Fundamentals",
      desc: "Ilaalinta qalabka iyo xogta shabakadda.",
      steps: [
        "Device Security (SSH, Passwords, Banners)",
        "Port Security (Layer 2 Protection)",
        "DHCP Snooping & DAI Basics",
        "ACLs (Standard & Extended)",
        "VPN Concepts (Site-to-Site, Remote Access)"
      ],
      action: "Samee ACL diidaya in PC gaar ah uu galo Web Server, laakiin u ogolaanaya Ping."
    },
    {
      id: 7,
      title: "Module 7: Wireless & Automation",
      desc: "Shabakadaha casriga ah iyo Automation-ka.",
      steps: [
        "Wireless Architectures (AP Modes, WLC)",
        "Wireless Security (WPA2, WPA3)",
        "SDN & Controller-Based Networking",
        "REST APIs & JSON Data format",
        "Automation Tools (Ansible, Puppet, Chef)"
      ],
      action: "Soo deji JSON file fudud, isku day inaad fahanto Key-Value pairs-ka ku jira."
    },
    {
      id: 8,
      title: "Module 8: Exam Prep & Labs",
      desc: "Isku dubaridka wax walba iyo diyaarinta imtixaanka.",
      steps: [
        "Mega Lab Creation (Routing + Switching + Security)",
        "Troubleshooting Methodology (Ping, Traceroute)",
        "Practice Exams & Review",
        "Final Review of Exam Topics"
      ],
      action: "Gal imtixaan tijaabo ah (Practice Exam), sax khaladaadkaaga."
    }
  ];
  
  // --- DATA: Schedule ---
  const scheduleData = [
    { week: 1, mod: "Module 1", topic: "OSI, TCP/IP, Cabling" },
    { week: 2, mod: "Module 2", topic: "IPv4, Binary, Conversion" },
    { week: 3, mod: "Module 2", topic: "Subnetting (Focus Week)" },
    { week: 4, mod: "Module 3", topic: "Switch Config, VLANs" },
    { week: 5, mod: "Module 3", topic: "STP, EtherChannel, Security" },
    { week: 6, mod: "Module 4", topic: "Static Routes, ROAS" },
    { week: 7, mod: "Module 4", topic: "OSPFv2, Routing Tables" },
    { week: 8, mod: "Module 5", topic: "DHCP, DNS, NAT/PAT" },
    { week: 9, mod: "Module 6", topic: "ACLs, SSH, Port Security" },
    { week: 10, mod: "Module 7", topic: "Wireless, JSON, SDN" },
    { week: 11, mod: "Module 8", topic: "Mega Lab (Full Network)" },
    { week: 12, mod: "Module 8", topic: "Practice Exams & Review" },
  ];
  
  // --- DATA: Labs ---
  const labsData = [
    {
      title: "Basic Switch Security",
      desc: "Dejinta magaca, sirta, iyo SSH.",
      scenario: "Scenario: Shirkad cusub ayaa rabta in Switch-yada la sugo. Waa inaad xirta console-ka iyo remote access.",
      code: `Switch> enable
  Switch# configure terminal
  Switch(config)# hostname SW1
  SW1(config)# enable secret cisco123
  SW1(config)# service password-encryption
  SW1(config)# line console 0
  SW1(config-line)# password cisco
  SW1(config-line)# login
  SW1(config-line)# exit
  SW1(config)# ip domain-name lab.local
  SW1(config)# crypto key generate rsa modulus 1024
  SW1(config)# line vty 0 4
  SW1(config-line)# transport input ssh
  SW1(config-line)# login local
  SW1(config-line)# end
  SW1# copy running-config startup-config`
    },
    {
      title: "VLANs & Trunking",
      desc: "Abuurista VLANs iyo isku xirka Switch-yada.",
      scenario: "Scenario: Waxaad haysataa waaxda Sales (VLAN 10) iyo IT (VLAN 20). Isku xir laba switch adigoo isticmaalaya Trunk.",
      code: `SW1(config)# vlan 10
  SW1(config-vlan)# name SALES
  SW1(config-vlan)# exit
  SW1(config)# vlan 20
  SW1(config-vlan)# name IT
  SW1(config-vlan)# exit
  
  ! Assign Ports
  SW1(config)# interface range fa0/1 - 10
  SW1(config-if-range)# switchport mode access
  SW1(config-if-range)# switchport access vlan 10
  SW1(config-if-range)# exit
  
  ! Configure Trunk
  SW1(config)# interface gig0/1
  SW1(config-if)# switchport mode trunk
  SW1(config-if)# switchport trunk native vlan 99
  SW1(config-if)# end`
    },
    {
      title: "OSPF Configuration",
      desc: "Dhaqaajinta Routing Protocol-ka OSPF.",
      scenario: "Scenario: Isku xir 3 Router adigoo isticmaalaya OSPF Area 0. Hubi in ay wada hadli karaan.",
      code: `R1(config)# router ospf 1
  R1(config-router)# router-id 1.1.1.1
  R1(config-router)# network 192.168.10.0 0.0.0.255 area 0
  R1(config-router)# network 10.0.0.0 0.0.0.3 area 0
  R1(config-router)# passive-interface g0/1
  R1(config-router)# end
  R1# show ip ospf neighbor`
    }
  ];

// --- COMPONENTS ---

const CLISimulator = ({ isDark }) => {
    const [history, setHistory] = useState([
        "Cisco IOS Software, C2960 Software (C2960-LANBASEK9-M), Version 15.0(2)SE4",
        "Technical Support: http://www.cisco.com/techsupport",
        "Copyright (c) 1986-2013 by Cisco Systems, Inc.",
        "",
        "Press RETURN to get started!"
    ]);
    const [input, setInput] = useState("");
    const [mode, setMode] = useState(0); // 0: User, 1: Priv, 2: Config
    const [hostname, setHostname] = useState("Switch");
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    const getPrompt = () => {
        if (mode === 0) return `${hostname}>`;
        if (mode === 1) return `${hostname}#`;
        if (mode === 2) return `${hostname}(config)#`;
        return `${hostname}>`;
    };

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim();
            const newHistory = [...history, `${getPrompt()} ${input}`];
            
            // Logic processor
            if (cmd === "") {
                // do nothing
            } else if (mode === 0 && cmd === "enable") {
                setMode(1);
            } else if (mode === 1 && (cmd === "disable" || cmd === "exit")) {
                setMode(0);
            } else if (mode === 1 && (cmd === "configure terminal" || cmd === "conf t")) {
                setMode(2);
                newHistory.push("Enter configuration commands, one per line.  End with CNTL/Z.");
            } else if (mode === 2 && (cmd === "exit" || cmd === "end")) {
                setMode(1);
                newHistory.push("%SYS-5-CONFIG_I: Configured from console by console");
            } else if (mode === 2 && cmd.startsWith("hostname ")) {
                const newName = cmd.split(" ")[1];
                if (newName) setHostname(newName);
            } else if (cmd === "?" || cmd === "help") {
                newHistory.push("Exec commands:", "  enable - Turn on privileged commands", "  exit - Exit from the EXEC", "  configure - Enter configuration mode", "  ping - Send echo messages");
            } else if (cmd === "show ip interface brief" || cmd === "sh ip int br") {
                newHistory.push(
                    "Interface              IP-Address      OK? Method Status                Protocol",
                    "FastEthernet0/1        unassigned      YES unset  up                    up",
                    "FastEthernet0/2        unassigned      YES unset  down                  down",
                    "Vlan1                  unassigned      YES unset  down                  down"
                );
            } else if (cmd === "show version") {
                 newHistory.push("Cisco IOS Software, Version 15.0(2)SE4", "Uptime is 12 minutes");
            } else {
                newHistory.push("% Invalid input detected at '^' marker.");
            }

            setHistory(newHistory);
            setInput("");
        }
    };

    return (
        <div className={`rounded-xl overflow-hidden border shadow-2xl font-mono text-sm ${isDark ? 'border-slate-700' : 'border-gray-300'}`}>
            <div className="bg-slate-900 text-gray-400 p-2 text-xs flex gap-2 items-center border-b border-slate-700">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <span className="ml-2">Terminal - {hostname}</span>
            </div>
            <div className="bg-black text-green-500 p-4 h-[400px] overflow-y-auto" onClick={() => document.getElementById('cli-input').focus()}>
                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap min-h-[1.2em]">{line}</div>
                ))}
                <div className="flex">
                    <span className="mr-2">{getPrompt()}</span>
                    <input 
                        id="cli-input"
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        autoComplete="off"
                        autoFocus
                        className="bg-transparent border-none outline-none flex-1 text-green-500 font-mono caret-green-500"
                    />
                </div>
                <div ref={bottomRef}></div>
            </div>
        </div>
    );
};

const Flashcards = ({ isDark }) => {
    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const nextCard = () => {
        setIsFlipped(false);
        setTimeout(() => setCurrentCard((prev) => (prev + 1) % glossaryData.length), 200);
    };

    const prevCard = () => {
        setIsFlipped(false);
        setTimeout(() => setCurrentCard((prev) => (prev - 1 + glossaryData.length) % glossaryData.length), 200);
    };

    return (
        <div className="max-w-2xl mx-auto text-center">
            <div 
                className={`relative h-64 w-full cursor-pointer perspective-1000 group mb-8`}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className={`relative w-full h-full duration-500 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
                    {/* Front */}
                    <div className={`absolute w-full h-full backface-hidden rounded-2xl border-2 flex flex-col items-center justify-center p-8 shadow-xl
                        ${isDark ? 'bg-slate-800 border-blue-500 text-white' : 'bg-white border-blue-200 text-slate-800'}
                    `}>
                        <span className="text-sm uppercase tracking-widest text-blue-500 mb-4 font-bold">Term</span>
                        <h2 className="text-4xl font-black">{glossaryData[currentCard].term}</h2>
                        <p className={`mt-4 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Click to flip</p>
                    </div>

                    {/* Back */}
                    <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl border-2 flex flex-col items-center justify-center p-8 shadow-xl
                        ${isDark ? 'bg-slate-900 border-purple-500 text-slate-200' : 'bg-slate-50 border-purple-200 text-slate-700'}
                    `}>
                         <span className="text-sm uppercase tracking-widest text-purple-500 mb-4 font-bold">Definition</span>
                         <p className="text-lg leading-relaxed">{glossaryData[currentCard].def}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <button onClick={prevCard} className={`px-6 py-2 rounded-lg font-bold border ${isDark ? 'border-slate-600 hover:bg-slate-800' : 'border-gray-300 hover:bg-gray-100'}`}>Previous</button>
                <span className={`py-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{currentCard + 1} / {glossaryData.length}</span>
                <button onClick={nextCard} className="px-6 py-2 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700">Next</button>
            </div>
        </div>
    );
};

const Cheatsheet = ({ isDark }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cheatsheetData.map((section, idx) => (
                <div key={idx} className={`rounded-xl border overflow-hidden ${isDark ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white'}`}>
                    <div className={`p-4 border-b font-bold ${isDark ? 'bg-slate-900 border-slate-700 text-blue-400' : 'bg-slate-50 border-gray-200 text-slate-800'}`}>
                        {section.category}
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-slate-700">
                        {section.commands.map((item, i) => (
                            <div key={i} className="p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 hover:bg-opacity-50 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                                <code className={`font-mono text-sm px-2 py-1 rounded w-fit ${isDark ? 'bg-slate-900 text-green-400' : 'bg-gray-100 text-red-600'}`}>
                                    {item.cmd}
                                </code>
                                <span className={`text-xs text-right ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {item.desc}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const CountdownTimer = ({ examDate, setExamDate, isDark }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });
  const [isEditing, setIsEditing] = useState(!examDate);

  useEffect(() => {
    if (!examDate) return;
    
    const calculateTime = () => {
      const difference = new Date(examDate) - new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        };
      }
      return { days: 0, hours: 0 };
    };

    setTimeLeft(calculateTime());
    const timer = setInterval(() => setTimeLeft(calculateTime()), 1000 * 60); // update every minute
    return () => clearInterval(timer);
  }, [examDate]);

  return (
    <div className={`p-6 rounded-2xl border shadow-sm transition-all mb-8
      ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}
    `}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          <Clock className="text-blue-500" size={20} /> Exam Countdown
        </h3>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`text-xs px-2 py-1 rounded border transition-colors
             ${isDark ? 'border-slate-600 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-500 hover:text-blue-600'}
          `}
        >
          {isEditing ? 'Save' : 'Edit Date'}
        </button>
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-2">
          <label className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Set your target exam date:</label>
          <input 
            type="date" 
            value={examDate} 
            onChange={(e) => {
              setExamDate(e.target.value);
            }}
            className={`p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 w-full
              ${isDark ? 'bg-slate-900 border-slate-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}
            `}
          />
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <div className="text-center">
            <span className={`text-4xl font-black block ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              {timeLeft.days}
            </span>
            <span className={`text-xs uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Days</span>
          </div>
          <div className={`h-10 w-px ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
           <div className="text-center">
            <span className={`text-4xl font-black block ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
              {timeLeft.hours}
            </span>
            <span className={`text-xs uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Hours</span>
          </div>
        </div>
      )}
    </div>
  );
};

const QuizComponent = ({ isDark }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null); // null, true, false

  const handleAnswer = (index) => {
    if (selectedOption !== null) return; // prevent multiple clicks
    setSelectedOption(index);
    
    if (index === quizData[currentQ].ans) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    if (currentQ < quizData.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  if (showScore) {
    return (
      <div className={`text-center p-10 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <Award size={64} className="mx-auto text-yellow-500 mb-6" />
        <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Quiz Completed!</h2>
        <p className={`text-xl mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          You scored <span className="font-bold text-blue-500">{score}</span> out of {quizData.length}
        </p>
        <button 
          onClick={resetQuiz}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
        >
          <RefreshCw size={18} /> Retry Quiz
        </button>
      </div>
    );
  }

  return (
    <div className={`max-w-2xl mx-auto rounded-2xl border overflow-hidden shadow-lg ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      <div className={`p-6 border-b ${isDark ? 'border-slate-700 bg-slate-900' : 'border-gray-100 bg-slate-50'}`}>
         <div className="flex justify-between items-center mb-4">
            <span className={`text-xs font-bold px-2 py-1 rounded ${isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
               Question {currentQ + 1}/{quizData.length}
            </span>
            <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Score: {score}</span>
         </div>
         <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {quizData[currentQ].q}
         </h3>
      </div>
      
      <div className="p-6 space-y-3">
        {quizData[currentQ].options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            disabled={selectedOption !== null}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium flex justify-between items-center
              ${selectedOption === null 
                ? (isDark ? 'border-slate-600 bg-slate-800 hover:bg-slate-700 text-slate-200' : 'border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50 text-slate-700')
                : ''}
              ${selectedOption !== null && idx === quizData[currentQ].ans 
                ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : ''}
              ${selectedOption === idx && idx !== quizData[currentQ].ans 
                ? 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                : ''}
            `}
          >
            {opt}
            {selectedOption !== null && idx === quizData[currentQ].ans && <CheckCircle size={20} className="text-green-500" />}
          </button>
        ))}
      </div>

      {selectedOption !== null && (
         <div className={`p-4 border-t flex justify-end ${isDark ? 'border-slate-700 bg-slate-900' : 'border-gray-100 bg-gray-50'}`}>
            <button 
               onClick={nextQuestion}
               className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
               {currentQ === quizData.length - 1 ? "Finish" : "Next Question"}
            </button>
         </div>
      )}
    </div>
  );
};

const GlossaryComponent = ({ isDark }) => {
   const [searchTerm, setSearchTerm] = useState("");

   const filteredTerms = glossaryData.filter(item => 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.def.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div className="max-w-3xl mx-auto">
         <div className="relative mb-8">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} size={20} />
            <input 
               type="text" 
               placeholder="Search terms (e.g., OSPF, ARP)..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className={`w-full pl-12 pr-4 py-4 rounded-xl border text-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-gray-200 text-slate-900 placeholder-slate-400'}
               `}
            />
         </div>

         <div className="grid gap-4">
            {filteredTerms.length > 0 ? (
               filteredTerms.map((item, idx) => (
                  <div key={idx} className={`p-5 rounded-xl border transition-all hover:shadow-md
                     ${isDark ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-white border-gray-100 hover:border-blue-200'}
                  `}>
                     <h3 className={`text-lg font-black mb-1 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>{item.term}</h3>
                     <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.def}</p>
                  </div>
               ))
            ) : (
               <div className={`text-center py-10 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  No terms found matching "{searchTerm}"
               </div>
            )}
         </div>
      </div>
   );
};

const CodeBlock = ({ title, desc, scenario, code, isDark }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-lg overflow-hidden my-6 shadow-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
      <div className={`flex justify-between items-center px-4 py-3 border-b ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
        <div>
          <h3 className={`font-bold text-sm ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>{title}</h3>
        </div>
        <button 
          onClick={handleCopy}
          className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded transition-all font-medium
            ${isDark 
              ? 'bg-slate-700 text-gray-300 hover:text-white hover:bg-slate-600' 
              : 'bg-white text-slate-600 border border-gray-300 hover:bg-gray-50'}`}
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className={`p-4 text-sm border-b ${isDark ? 'text-gray-400 border-slate-700 bg-slate-800/50' : 'text-slate-600 border-gray-100 bg-gray-50'}`}>
        <p className="mb-2">{desc}</p>
        <p className={`italic ${isDark ? 'text-yellow-500/80' : 'text-orange-600'}`}>{scenario}</p>
      </div>
      <pre className={`p-4 font-mono text-sm overflow-x-auto leading-relaxed ${isDark ? 'bg-[#0d1117] text-green-400' : 'bg-slate-900 text-green-400'}`}>
        {code}
      </pre>
    </div>
  );
};

const ModuleCard = ({ module, completedSteps, toggleStep, isDark, userNotes, saveNote }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [noteText, setNoteText] = useState(userNotes[module.id] || "");
  const [isSaving, setIsSaving] = useState(false);
  
  const totalSteps = module.steps.length + 1; // steps + action item
  const completedCount = (completedSteps[module.id] || []).length;
  const progress = Math.round((completedCount / totalSteps) * 100);
  const isCompleted = progress === 100;

  const handleSaveNote = () => {
    setIsSaving(true);
    saveNote(module.id, noteText);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className={`mb-4 border rounded-xl overflow-hidden transition-all duration-300 shadow-sm
      ${isDark 
        ? (isCompleted ? 'bg-green-900/10 border-green-800' : 'bg-slate-800 border-slate-700') 
        : (isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200')}
    `}>
      <div 
        className={`flex items-center justify-between p-5 cursor-pointer hover:opacity-95 transition-colors
          ${isDark && !isCompleted ? 'hover:bg-slate-750' : ''}
          ${!isDark && !isCompleted ? 'hover:bg-gray-50' : ''}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 shrink-0 transition-all
            ${isCompleted 
              ? 'bg-green-500 border-green-500 text-white' 
              : (isDark ? 'border-slate-600 text-slate-400 bg-slate-800' : 'border-gray-200 text-gray-400 bg-gray-50')}
          `}>
             {isCompleted ? <Check size={20} strokeWidth={3} /> : <span className="text-sm font-bold">{progress}%</span>}
          </div>
          <div>
            <h3 className={`font-bold text-lg ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
              {module.title}
            </h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{module.desc}</p>
          </div>
        </div>
        <div className={`${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      <div className="h-1 w-full bg-gray-200 dark:bg-slate-700">
         <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>

      {isOpen && (
        <div className={`p-5 pt-4 pl-4 md:pl-20 border-t border-dashed ${isDark ? 'border-slate-700 bg-slate-900/30' : 'border-gray-100 bg-white'}`}>
          <ul className="space-y-3 mb-6">
            {module.steps.map((step, idx) => {
              const stepId = `step-${idx}`;
              const isChecked = (completedSteps[module.id] || []).includes(stepId);
              
              return (
                <li key={idx} 
                  className={`flex items-start gap-3 text-sm transition-all cursor-pointer select-none
                    ${isChecked 
                      ? (isDark ? 'text-slate-500 line-through' : 'text-gray-400 line-through') 
                      : (isDark ? 'text-slate-300' : 'text-slate-700')}
                  `}
                  onClick={(e) => { e.stopPropagation(); toggleStep(module.id, stepId); }}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors
                    ${isChecked 
                      ? 'bg-blue-500 border-blue-500 text-white' 
                      : (isDark ? 'border-slate-600 bg-slate-800' : 'border-gray-300 bg-white')}
                  `}>
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </div>
                  {step}
                </li>
              );
            })}
          </ul>
          
          <div 
            className={`mb-6 p-4 rounded-lg text-sm border flex gap-3 items-start cursor-pointer transition-colors
              ${(completedSteps[module.id] || []).includes('action')
                 ? (isDark ? 'bg-green-900/20 border-green-800/50 text-green-400' : 'bg-green-50 border-green-100 text-green-700')
                 : (isDark ? 'bg-blue-900/20 border-blue-800/50 text-blue-300' : 'bg-blue-50 border-blue-100 text-blue-800')
              }
            `}
            onClick={(e) => { e.stopPropagation(); toggleStep(module.id, 'action'); }}
          >
            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors
              ${(completedSteps[module.id] || []).includes('action') 
                ? 'bg-green-500 border-green-500 text-white' 
                : (isDark ? 'border-blue-700 bg-blue-900/30' : 'border-blue-200 bg-white')}
            `}>
              {(completedSteps[module.id] || []).includes('action') && <Check size={12} strokeWidth={3} />}
            </div>
            <div>
              <span className="font-bold block mb-1 uppercase text-xs tracking-wider opacity-80">Action Item (Lab Practice)</span>
              {module.action}
            </div>
          </div>

          {/* Notes Section */}
          <div className={`mt-4 pt-4 border-t ${isDark ? 'border-slate-700' : 'border-gray-100'}`}>
             <div className="flex justify-between items-center mb-2">
                <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                   <FileText size={12} /> My Notes
                </label>
                <button 
                   onClick={handleSaveNote}
                   className={`text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors
                      ${isSaving ? 'text-green-500' : (isDark ? 'text-blue-400 hover:text-white' : 'text-blue-600 hover:text-blue-800')}
                   `}
                >
                   {isSaving ? <Check size={12} /> : <Save size={12} />}
                   {isSaving ? 'Saved' : 'Save Note'}
                </button>
             </div>
             <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write your notes here for this module..."
                className={`w-full p-3 rounded-lg text-sm min-h-[80px] focus:outline-none focus:ring-1 focus:ring-blue-500
                   ${isDark ? 'bg-slate-950 border border-slate-700 text-slate-300 placeholder-slate-700' : 'bg-gray-50 border border-gray-200 text-slate-700 placeholder-gray-400'}
                `}
             />
          </div>
        </div>
      )}
    </div>
  );
};

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [completedSteps, setCompletedSteps] = useState({});
  const [userName, setUserName] = useState('');
  
  // New States
  const [examDate, setExamDate] = useState('');
  const [userNotes, setUserNotes] = useState({});
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  // Load state
  useEffect(() => {
    const savedSteps = localStorage.getItem('ccnaSteps');
    const savedTheme = localStorage.getItem('ccnaTheme');
    const savedName = localStorage.getItem('ccnaName');
    const savedDate = localStorage.getItem('ccnaExamDate');
    const savedNotes = localStorage.getItem('ccnaNotes');

    if (savedSteps) setCompletedSteps(JSON.parse(savedSteps));
    if (savedTheme === 'dark') setDarkMode(true);
    if (savedName) setUserName(savedName);
    if (savedDate) setExamDate(savedDate);
    if (savedNotes) setUserNotes(JSON.parse(savedNotes));
  }, []);

  // Save state
  useEffect(() => {
    localStorage.setItem('ccnaSteps', JSON.stringify(completedSteps));
    localStorage.setItem('ccnaTheme', darkMode ? 'dark' : 'light');
    localStorage.setItem('ccnaName', userName);
    localStorage.setItem('ccnaExamDate', examDate);
    localStorage.setItem('ccnaNotes', JSON.stringify(userNotes));
  }, [completedSteps, darkMode, userName, examDate, userNotes]);

  const toggleStep = (moduleId, stepId) => {
    setCompletedSteps(prev => {
      const moduleSteps = prev[moduleId] || [];
      const newModuleSteps = moduleSteps.includes(stepId)
        ? moduleSteps.filter(id => id !== stepId)
        : [...moduleSteps, stepId];
      
      return { ...prev, [moduleId]: newModuleSteps };
    });
  };

  const saveNote = (moduleId, text) => {
     setUserNotes(prev => ({
        ...prev,
        [moduleId]: text
     }));
  };

  const calculateTotalProgress = () => {
    let totalPossibleSteps = 0;
    let totalCompletedSteps = 0;

    modulesData.forEach(mod => {
      totalPossibleSteps += (mod.steps.length + 1); // steps + action
      totalCompletedSteps += (completedSteps[mod.id] || []).length;
    });

    return Math.round((totalCompletedSteps / totalPossibleSteps) * 100);
  };

  const globalProgress = calculateTotalProgress();

  const NavItem = ({ id, label, icon: Icon }) => (
    <button 
      onClick={() => { setActiveTab(id); setIsToolsOpen(false); }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium whitespace-nowrap
        ${activeTab === id 
          ? (darkMode ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'bg-slate-900 text-white shadow-md') 
          : (darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-200')}`}
    >
      <Icon size={16} />
      <span>{label}</span>
    </button>
  );

  const DropdownItem = ({ id, label, icon: Icon }) => (
      <button 
        onClick={() => { setActiveTab(id); setIsToolsOpen(false); }}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left
           ${activeTab === id 
              ? (darkMode ? 'bg-slate-800 text-blue-400' : 'bg-blue-50 text-blue-700') 
              : (darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-gray-50')}
        `}
      >
          <Icon size={16} />
          {label}
      </button>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="text-center py-16 px-4">
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3 transition-transform hover:rotate-6
               ${darkMode ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white' : 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white'}
            `}>
              <BookOpen size={40} />
            </div>
            <h1 className={`text-5xl md:text-7xl font-black mb-6 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              CCNA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Mastery</span>
            </h1>
            <p className={`text-xl max-w-2xl mx-auto mb-12 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Roadmap casri ah oo kugu hagaya shahaadada Cisco CCNA 200-301. <br/>
              <span className="font-semibold text-blue-500">12 Toddobaad. 8 Modules. 1 Hadaf.</span>
            </p>
            
            <div className="max-w-md mx-auto mb-12">
               <CountdownTimer examDate={examDate} setExamDate={setExamDate} isDark={darkMode} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button 
                onClick={() => setActiveTab('modules')}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                Start Learning <ChevronDown className="-rotate-90" size={18} />
              </button>
              <button 
                 onClick={() => setActiveTab('cli')}
                 className={`px-8 py-4 rounded-xl font-bold border transition-colors flex items-center justify-center gap-2
                  ${darkMode ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-white text-slate-700 border-slate-200 hover:bg-gray-50'}
                 `}
              >
                <Terminal size={18} /> Try CLI
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
              {[
                { label: "Global Progress", val: `${globalProgress}%`, color: "text-green-500", icon: CheckCircle },
                { label: "Total Modules", val: "8", color: "text-purple-500", icon: BookOpen },
                { label: "Lab Exercises", val: "15+", color: "text-orange-500", icon: Terminal },
              ].map((stat, i) => (
                <div key={i} className={`p-6 rounded-2xl border shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]
                  ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}
                `}>
                  <div className={`p-3 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                    <stat.icon size={24} className={stat.color} />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{stat.val}</h3>
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Certificate Teaser */}
            {globalProgress === 100 && (
              <div className="mt-12 animate-fade-in-up">
                <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                  <div className={`px-8 py-6 rounded-xl flex flex-col items-center text-center ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
                    <Award size={48} className="text-yellow-500 mb-4" />
                    <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Congratulations!</h3>
                    <p className={`mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>You have mastered the roadmap.</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Enter your name" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-300'}`}
                      />
                    </div>
                    {userName && (
                       <div className="mt-6 p-8 border-4 border-double border-yellow-600 bg-[#fff9e6] text-slate-900 font-serif w-full max-w-lg shadow-2xl relative">
                          <div className="absolute top-0 left-0 w-full h-full border border-yellow-600 m-1 pointer-events-none"></div>
                          <h2 className="text-3xl font-bold uppercase mb-2">Certificate of Completion</h2>
                          <p className="italic mb-6">This certifies that</p>
                          <h1 className="text-4xl font-bold text-blue-900 border-b-2 border-slate-900 pb-2 inline-block mb-6">{userName}</h1>
                          <p>Has successfully completed the</p>
                          <p className="font-bold text-xl mt-2">CCNA Networking Roadmap</p>
                          <div className="mt-8 text-xs text-slate-500 uppercase tracking-widest">Verified by Gemini Canvas</div>
                       </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'modules':
        return (
          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Learning Modules</h2>
                <p className={`mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Track your progress & take notes.</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-500">{globalProgress}%</div>
              </div>
            </div>
            
            {/* Master Progress Bar */}
            <div className={`w-full rounded-full h-3 mb-10 overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-gray-200'}`}>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${globalProgress}%` }}></div>
            </div>

            <div className="space-y-6">
              {modulesData.map(mod => (
                <ModuleCard 
                  key={mod.id} 
                  module={mod} 
                  completedSteps={completedSteps}
                  toggleStep={toggleStep}
                  isDark={darkMode}
                  userNotes={userNotes}
                  saveNote={saveNote}
                />
              ))}
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="max-w-4xl mx-auto px-4 py-8">
             <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Jadwalka 12-ka Toddobaad</h2>
             <div className={`rounded-xl shadow-lg border overflow-hidden ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className={`text-xs uppercase tracking-wider border-b ${darkMode ? 'bg-slate-900 text-slate-400 border-slate-700' : 'bg-slate-50 text-slate-500 border-gray-200'}`}>
                       <th className="p-5 font-semibold">Toddobaadka</th>
                       <th className="p-5 font-semibold">Module</th>
                       <th className="p-5 font-semibold">Mawduuca / Diiradda</th>
                     </tr>
                   </thead>
                   <tbody className={`divide-y ${darkMode ? 'divide-slate-700' : 'divide-gray-100'}`}>
                     {scheduleData.map((row, idx) => (
                       <tr 
                          key={idx} 
                          className={`transition-colors cursor-pointer group
                             ${darkMode ? 'hover:bg-slate-750 hover:text-blue-400' : 'hover:bg-blue-50'}
                             ${darkMode ? 'text-slate-300' : 'text-slate-600'}
                          `}
                          onClick={() => setActiveTab('modules')}
                       >
                         <td className={`p-5 font-medium ${darkMode ? 'text-slate-200' : 'text-slate-900'}`}>Toddobaadka {row.week}</td>
                         <td className="p-5">
                           <span className={`px-3 py-1 rounded-md text-xs font-bold border 
                             ${darkMode ? 'bg-slate-700 border-slate-600 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'}
                           `}>
                             {row.mod}
                           </span>
                         </td>
                         <td className="p-5">{row.topic}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
          </div>
        );

      case 'labs':
        return (
          <div className="max-w-3xl mx-auto px-4 py-8">
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Practice Labs</h2>
            <p className={`mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Real-world Cisco IOS scenarios.</p>
            
            {labsData.map((lab, idx) => (
              <div key={idx} className="mb-10">
                <h3 className={`text-xl font-bold flex items-center gap-2 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  <Terminal size={20} className="text-blue-500" /> 
                  {lab.title}
                </h3>
                <CodeBlock 
                   title="Cisco IOS CLI" 
                   desc={lab.desc} 
                   scenario={lab.scenario} 
                   code={lab.code} 
                   isDark={darkMode}
                />
              </div>
            ))}
          </div>
        );
      
      case 'cli':
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>CLI Simulator</h2>
                <p className={`mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Practice Cisco commands directly here. Try <code>enable</code>, <code>configure terminal</code>, <code>hostname Test</code>, or <code>show ip int brief</code>.
                </p>
                <CLISimulator isDark={darkMode} />
            </div>
        );

      case 'quiz':
         return (
            <div className="max-w-3xl mx-auto px-4 py-8">
               <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Mini Quiz</h2>
               <p className={`mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Test your knowledge with these quick questions.</p>
               <QuizComponent isDark={darkMode} />
            </div>
         );

      case 'flashcards':
          return (
            <div className="max-w-3xl mx-auto px-4 py-8">
                <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Flashcards</h2>
                <p className={`mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Memorize key terms interactively.</p>
                <Flashcards isDark={darkMode} />
            </div>
          );

      case 'cheatsheet':
          return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Command Cheatsheet</h2>
                <p className={`mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Quick reference for common Cisco IOS commands.</p>
                <Cheatsheet isDark={darkMode} />
            </div>
          );

      case 'glossary':
         return (
            <div className="max-w-4xl mx-auto px-4 py-8">
               <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Networking Glossary</h2>
               <p className={`mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Common terms and definitions.</p>
               <GlossaryComponent isDark={darkMode} />
            </div>
         );

      case 'resources':
        return (
          <div className="max-w-4xl mx-auto px-4 py-8">
             <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Resources Library</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {resourcesData.map((section, idx) => (
                 <div key={idx} className={`rounded-xl border p-6 shadow-sm transition-all hover:shadow-md
                    ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}
                 `}>
                   <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>
                     {idx === 0 && <Youtube size={20} />}
                     {idx === 1 && <Terminal size={20} />}
                     {idx === 2 && <BookOpen size={20} />}
                     {section.category}
                   </h3>
                   <ul className="space-y-3">
                     {section.items.map((item, i) => (
                       <li key={i}>
                         <a href={item.link} target="_blank" rel="noopener noreferrer" 
                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors group
                              ${darkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-50 text-slate-700'}
                            `}>
                           <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0
                              ${darkMode ? 'bg-slate-700 text-slate-400 group-hover:bg-slate-600 group-hover:text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-sm'}
                           `}>
                             <item.icon size={16} />
                           </div>
                           <span className="font-medium">{item.title}</span>
                           <ExternalLink size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                         </a>
                       </li>
                     ))}
                   </ul>
                 </div>
               ))}
             </div>
             
             <div className={`mt-12 p-6 rounded-xl border border-dashed flex flex-col items-center text-center
                ${darkMode ? 'border-slate-700 bg-slate-800/50' : 'border-gray-300 bg-gray-50'}
             `}>
               <h4 className={`font-bold mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>GitHub Pages Deployment</h4>
               <p className={`text-sm max-w-lg mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                 Si aad website-kan u saarto GitHub, samee Repo cusub, koodkan gali, kadib settings-ka ka shid "Pages". Waa React Single File ah, markaa isticmaal Vite ama Create React App haddii aad doonayso inaad ballaariso.
               </p>
             </div>
          </div>
        );
      
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 flex flex-col ${darkMode ? 'dark' : ''}
      ${darkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-900'}
    `}>
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors
         ${darkMode ? 'bg-[#0f172a]/90 border-slate-800' : 'bg-white/90 border-slate-200'}
      `}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div 
              className={`font-black text-xl tracking-tight flex items-center gap-2 cursor-pointer
                ${darkMode ? 'text-white' : 'text-slate-900'}
              `}
              onClick={() => setActiveTab('home')}
            >
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                <BookOpen size={18} />
              </div>
              CCNA<span className="text-blue-500">Roadmap</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              <NavItem id="home" label="Home" icon={Home} />
              <NavItem id="modules" label="Modules" icon={BookOpen} />
              <NavItem id="schedule" label="Schedule" icon={Calendar} />
              <NavItem id="labs" label="Labs" icon={Terminal} />
              <NavItem id="resources" label="Res" icon={ExternalLink} />
              
              {/* Dropdown for Extra Tools */}
              <div className="relative">
                <button 
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all text-sm font-medium
                    ${isToolsOpen
                      ? (darkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900')
                      : (darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:bg-slate-200')}
                  `}
                >
                   <span>Practice Tools</span>
                   <ChevronDown size={14} className={`transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isToolsOpen && (
                  <div className={`absolute top-full right-0 mt-2 w-48 rounded-xl shadow-xl border overflow-hidden animate-fade-in
                    ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-100'}
                  `}>
                      <DropdownItem id="cli" label="CLI Simulator" icon={Play} />
                      <DropdownItem id="flashcards" label="Flashcards" icon={Layers} />
                      <DropdownItem id="cheatsheet" label="Cheatsheet" icon={List} />
                      <DropdownItem id="quiz" label="Quiz" icon={Brain} />
                      <DropdownItem id="glossary" label="Glossary" icon={Search} />
                  </div>
                )}
              </div>
              
              <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-2"></div>
              
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-all
                  ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-gray-100 text-slate-600 hover:bg-gray-200'}
                `}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Mobile Nav Toggle & Dark Mode */}
            <div className="lg:hidden flex items-center gap-3">
               <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full
                  ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-gray-100 text-slate-600'}
                `}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
               <span className="text-xs font-bold px-2 py-1 rounded bg-blue-100 text-blue-800">Menu ↓</span>
            </div>
          </div>
        </div>
        
        {/* Mobile Nav Bar (Bottom fixed) */}
        <div className={`lg:hidden fixed bottom-0 left-0 right-0 border-t p-2 flex gap-2 px-4 z-50 shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.1)] overflow-x-auto no-scrollbar
           ${darkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-gray-200'}
        `}>
            {[
                { id: 'home', icon: Home, label: 'Home' },
                { id: 'modules', icon: BookOpen, label: 'Modules' },
                { id: 'labs', icon: Terminal, label: 'Labs' },
                { id: 'cli', icon: Play, label: 'CLI' },
                { id: 'flashcards', icon: Layers, label: 'Cards' },
                { id: 'cheatsheet', icon: List, label: 'Sheet' },
                { id: 'quiz', icon: Brain, label: 'Quiz' },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)} 
                  className={`flex flex-col items-center p-2 rounded-lg transition-all min-w-[60px] flex-shrink-0
                    ${activeTab === tab.id 
                      ? 'text-blue-500 bg-blue-500/10' 
                      : (darkMode ? 'text-slate-500 hover:text-slate-300' : 'text-gray-400 hover:text-gray-600')}
                  `}
                >
                  <Icon size={20} />
                  <span className="text-[10px] mt-1 capitalize">{tab.label}</span>
                </button>
              )
            })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pb-24 lg:pb-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className={`py-12 text-center border-t mt-auto hidden lg:block
         ${darkMode ? 'bg-[#0b1120] border-slate-800 text-slate-500' : 'bg-slate-900 border-slate-800 text-slate-400'}
      `}>
        <div className="flex justify-center gap-6 mb-6">
           {/* Social Placeholders */}
           {[1,2,3].map(i => (
             <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors
                ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-800 hover:bg-slate-700'}
             `}>
               <div className="w-4 h-4 rounded-full bg-slate-600"></div>
             </div>
           ))}
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} CCNA Networking Roadmap. <br/>
          Designed for GitHub Pages Deployment.
        </p>
      </footer>
    </div>
  );
};

// Render the app
const root = createRoot(document.getElementById('root'));
root.render(<MainApp />);
