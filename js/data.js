import { 
    BookOpen, Calendar, Terminal, CheckCircle, ChevronDown, ChevronUp, 
    Copy, Menu, X, Home, Check, Moon, Sun, ExternalLink, Award, Youtube, 
    Download, Clock, Brain, Search, FileText, Save, RefreshCw, Layers, List, Play, MoreHorizontal
  } from 'https://esm.sh/lucide-react@0.263.1?dev';
  
  // --- DATA: Glossary ---
  export const glossaryData = [
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
  export const cheatsheetData = [
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
  export const quizData = [
    { q: "Which layer of the OSI model handles logical addressing (IP)?", options: ["Layer 1 (Physical)", "Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)"], ans: 2 },
    { q: "What is the administrative distance of OSPF?", options: ["90", "100", "110", "120"], ans: 2 },
    { q: "Which command is used to configure a trunk port?", options: ["switchport mode access", "switchport mode trunk", "ip routing", "encapsulation dot1q"], ans: 1 },
    { q: "Which protocol is used to map IP addresses to MAC addresses?", options: ["DNS", "DHCP", "ARP", "ICMP"], ans: 2 },
    { q: "What is the default subnet mask for a Class C address?", options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"], ans: 2 },
  ];
  
  // --- DATA: Resources ---
  export const resourcesData = [
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
  export const modulesData = [
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
  export const scheduleData = [
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
  export const labsData = [
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