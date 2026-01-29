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
    { term: "STP", def: "Spanning Tree Protocol. Prevents loops in Layer 2 switched networks." },
    { term: "EtherChannel", def: "A technology used to group multiple physical links into one logical link." },
    { term: "DTP", def: "Dynamic Trunking Protocol. Cisco proprietary protocol to negotiate trunking." },
    { term: "Trunk", def: "A link carrying traffic for multiple VLANs (usually using 802.1Q)." },
    { term: "VLAN", def: "Virtual Local Area Network. Logically grouping devices on the same switch." },
    { term: "API", def: "Application Programming Interface. Allows two applications to talk to each other." },
    { term: "JSON", def: "JavaScript Object Notation. A lightweight data-interchange format used in automation." },
    { term: "SDN", def: "Software Defined Networking. Decoupling the control plane from the data plane." },
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
      },
      {
          category: "Routing",
          commands: [
              { cmd: "ip route [dst] [mask] [next-hop]", desc: "Configure static route" },
              { cmd: "router ospf [process-id]", desc: "Start OSPF process" },
              { cmd: "network [ip] [mask] area [id]", desc: "Advertise OSPF network" },
              { cmd: "router rip", desc: "Start RIP process" }
          ]
      },
      {
          category: "Security (ACLs)",
          commands: [
              { cmd: "access-list [id] permit [src]", desc: "Create standard ACL" },
              { cmd: "access-class [id] in/out", desc: "Apply ACL to VTY line" },
              { cmd: "ip access-group [id] in/out", desc: "Apply ACL to interface" },
              { cmd: "service password-encryption", desc: "Encrypt passwords" }
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
    { q: "Which data format is commonly used in REST APIs?", options: ["HTML", "XML", "JSON", "CSV"], ans: 2 },
    { q: "What does SDN separate from the Data Plane?", options: ["Management Plane", "Control Plane", "Physical Plane", "Application Plane"], ans: 1 },
    { q: "Which command encrypts all plaintext passwords on a Cisco device?", options: ["enable secret", "service password-encryption", "crypto key generate", "security passwords min-length"], ans: 1 },
    { q: "What is the primary function of a VLAN?", options: ["Increase broadcast domain size", "Decrease collision domains", "Logically separate broadcast domains", "Routing between networks"], ans: 2 },
    { q: "Which IPv6 address type is equivalent to a private IPv4 address?", options: ["Global Unicast", "Link-Local", "Unique Local", "Anycast"], ans: 2 },
    { q: "Which wireless standard is also known as Wi-Fi 6?", options: ["802.11ac", "802.11n", "802.11ax", "802.11g"], ans: 2 },
    { q: "What is the administrative distance of a static route by default?", options: ["0", "1", "90", "110"], ans: 1 },
    { q: "Which port security violation mode drops packets and sends a syslog message/SNMP trap?", options: ["Protect", "Restrict", "Shutdown", "Disable"], ans: 1 },
    { q: "Which command would you use to see the routing table?", options: ["show ip interface brief", "show ip route", "show ip protocols", "show running-config"], ans: 1 },
    { q: "What is the purpose of STP?", options: ["Route packets", "Prevent L2 loops", "Assign IP addresses", "Encrypt data"], ans: 1 },
  ];
  
  // --- DATA: Resources ---
  const resourcesData = [
    {
      category: "Video Courses",
      items: [
        { title: "Jeremy's IT Lab (Free CCNA Course)", link: "https://www.youtube.com/playlist?list=PLxbwE86jKRgMpuZuLBivzlM8s2Dk5lXBQ", icon: Youtube },
        { title: "NetworkChuck (CCNA Series)", link: "https://www.youtube.com/playlist?list=PLIhvC56v63IJVXv0GGk4OBk7GMP6eZRHh", icon: Youtube },
        { title: "Keith Barker (CBT Nuggets)", link: "https://www.youtube.com/user/Keith6783", icon: Youtube },
        { title: "Kevin Wallace Training", link: "https://www.youtube.com/@kwallacetraining", icon: Youtube },
      ]
    },
    {
      category: "Tools & Practice",
      items: [
        { title: "Download Cisco Packet Tracer", link: "https://www.netacad.com/courses/packet-tracer", icon: Download },
        { title: "Anki Flashcards (Memorization)", link: "https://apps.ankiweb.net/", icon: Download },
        { title: "Subnetting Practice Game", link: "https://subnettingpractice.com/", icon: ExternalLink },
        { title: "Cisco Software Download", link: "https://software.cisco.com/download/home", icon: Download },
      ]
    },
    {
      category: "Official Books & Docs",
      items: [
        { title: "CCNA 200-301 Official Cert Guide (Odom)", link: "https://www.ciscopress.com/promotions/new-cisco-certifications-142035", icon: BookOpen },
        { title: "31 Days Before your CCNA Exam", link: "https://www.ciscopress.com/", icon: BookOpen },
        { title: "Cisco CCNA Exam Topics (Official)", link: "https://learningnetwork.cisco.com/s/ccna-exam-topics", icon: ExternalLink },
      ]
    }
  ];
  
  // --- DATA: Module Content ---
  const modulesData = [
    {
      id: 1,
      title: "Module 1: Network Fundamentals (1.0)",
      desc: "Domain 1.0: Routers, Switches, Cabling, TCP/UDP & IPv6.",
      steps: [
        "1.1 Explain the role and function of network components (Router, Switch, L2/L3)",
        "1.2 Describe characteristics of network topology architectures (2-tier, 3-tier, Spine-leaf)",
        "1.3 Compare physical interface and cabling types (Single-mode, Multi-mode, Copper)",
        "1.4 Identify interface and cable issues (Collisions, Errors, Duplex mismatch)",
        "1.5 Compare TCP to UDP",
        "1.6 Configure and verify IPv4 addressing and subnetting"
      ],
      action: "Draw the OSI model and map devices (Hub, Switch, Router) to their layers."
    },
    {
      id: 2,
      title: "Module 2: Network Access - VLANs (2.0)",
      desc: "Domain 2.0: VLANs, Trunking & 802.1Q.",
      steps: [
        "2.1 Configure and verify VLANs (normal range) spanning multiple switches",
        "2.2 Configure and verify interswitch connectivity (Trunk ports, 802.1Q)",
        "2.3 Configure and verify Layer 2 discovery protocols (Cisco CDP and LLDP)",
        "2.4 Configure and verify (Layer 2/Layer 3) EtherChannel (LACP)",
        "Troubleshooting VLANs and Trunks (Native VLAN mismatch)"
      ],
      action: "Configure VLAN 10 & 20 on two switches, configure a Trunk link between them."
    },
    {
      id: 3,
      title: "Module 3: Network Access - STP & Wireless (2.0)",
      desc: "Domain 2.0: Spanning Tree & Wireless Architecture.",
      steps: [
        "2.5 Describe the need for and basic operations of Rapid PVST+ Spanning Tree Protocol",
        "2.6 Compare Cisco Wireless Architectures and AP modes",
        "2.7 Describe physical infrastructure connections of WLAN components (AP, WLC)",
        "2.8 Describe AP and WLC management access connections (Telnet/SSH/HTTP/HTTPS)",
        "2.9 Configure the components of a wireless LAN access for client connectivity using GUI only"
      ],
      action: "Research WPA3 encryption vs WPA2. Why is WPA3 better?"
    },
    {
      id: 4,
      title: "Module 4: IP Connectivity - Routing (3.0)",
      desc: "Domain 3.0: Routing Tables & Static Routing.",
      steps: [
        "3.1 Interpret the components of routing table (Mac, AD, Metric, Next-hop)",
        "3.2 Determine how a router makes a forwarding decision by default",
        "3.3 Configure and verify IPv4 and IPv6 static routing",
        "3.3a Default route",
        "3.3b Network route",
        "3.3c Host route",
        "3.3d Floating static"
      ],
      action: "Configure a Floating Static Route as a backup path."
    },
    {
      id: 5,
      title: "Module 5: IP Connectivity - OSPF (3.0)",
      desc: "Domain 3.0: Dynamic Routing with OSPFv2.",
      steps: [
        "3.4 Configure and verify single area OSPFv2",
        "3.4a Neighbor adjacencies",
        "3.4b Point-to-point",
        "3.4c Broadcast (DR/BDR selection)",
        "3.4d Router ID",
        "3.5 Describe the purpose of First Hop Redundancy Protocol (HSRP)"
      ],
      action: "Configure OSPF Single Area (Area 0) on 3 Routers."
    },
    {
      id: 6,
      title: "Module 6: IP Services (4.0)",
      desc: "Domain 4.0: DHCP, DNS, NAT, & NTP.",
      steps: [
        "4.1 Configure and verify inside source NAT using static and pools",
        "4.2 Configure and verify NTP operating in a client and server mode",
        "4.3 Explain the role of DHCP and DNS within the network",
        "4.4 Explain the function of SNMP in network operations",
        "4.5 Describe the use of syslog features including facilities and levels",
        "4.6 Configure and verify DHCP client and relay"
      ],
      action: "Configure PAT so internal private IPs can reach the 'Internet' loopback."
    },
    {
      id: 7,
      title: "Module 7: Security Fundamentals (5.0)",
      desc: "Domain 5.0: Concepts, Access Control & Port Security.",
      steps: [
        "5.1 Define key security concepts (threats, vulnerabilities, exploits, and mitigation techniques)",
        "5.2 Describe security program elements (user awareness, training, and physical access control)",
        "5.3 Configure and verify device access control using local passwords",
        "5.4 Describe security password policies elements, such as management, complexity, and alternatives",
        "5.6 Configure and verify Layer 2 security features (DHCP snooping, dynamic ARP inspection, and port security)"
      ],
      action: "Enable Port Security on a switch port to allow only 1 specific MAC address."
    },
    {
      id: 8,
      title: "Module 8: Security - ACLs & VPNs (5.0)",
      desc: "Domain 5.0: Access Control Lists & VPNs.",
      steps: [
        "5.7 Differentiate authentication, authorization, and accounting (AAA) concepts",
        "5.8 Describe wireless security protocols (WPA, WPA2, and WPA3)",
        "5.9 Configure and verify WLAN within the GUI using WPA2 PSK",
        "5.5 Describe remote access and site-to-site VPNs",
        "5.10 Configure and verify access control lists"
      ],
      action: "Create an Extended ACL to block Telnet but allow HTTP."
    },
    {
      id: 9,
      title: "Module 9: Automation & Programmability (6.0)",
      desc: "Domain 6.0: SDN, APIs, and Tools.",
      steps: [
        "6.1 Explain how automation impacts network management",
        "6.2 Compare traditional networks with controller-based networking",
        "6.3 Describe controller-based and software defined architectures (overlay, underlay, and fabric)",
        "6.4 Compare traditional campus device management with Cisco DNA Center enabled device management",
        "6.5 Describe characteristics of REST-based APIs (CRUD, HTTP verbs, and data encoding)"
      ],
      action: "Explore Cisco DevNet Sandbox (online) to see REST APIs in action."
    },
    {
      id: 10,
      title: "Module 10: Automation - JSON & config mgmt (6.0)",
      desc: "Domain 6.0: Data Formats and Config Management.",
      steps: [
        "6.6 Recognize the capabilities of configuration management mechanisms Puppet, Chef, and Ansible",
        "6.7 Interpret JSON encoded data",
        "Reviewing XML and YAML concepts",
        "Understanding Northbound vs Southbound APIs"
      ],
      action: "Write a simple JSON object describing a Router with interfaces."
    },
    {
      id: 11,
      title: "Module 11: Final Review (All Domains)",
      desc: "Reviewing all exam topics and filling gaps.",
      steps: [
        "Review Domain 1.0 (Fundamentals)",
        "Review Domain 2.0 (Access)",
        "Review Domain 3.0 (Connectivity)",
        "Review Domain 4.0 (Services)",
        "Review Domain 5.0 (Security)",
        "Review Domain 6.0 (Automation)"
      ],
      action: "Take a full practice exam simulation."
    },
    {
      id: 12,
      title: "Module 12: The Mega Lab",
      desc: "Building a complete network from scratch.",
      steps: [
        "Design: Topology with Core/Dist/Access layers",
        "L2 Implementation: VLANs, Trunks, EtherChannel, STP Security",
        "L3 Implementation: ROAS, OSPF, Default Routes, Floating Static",
        "Services: DHCP Relay, NAT/PAT, NTP Client",
        "Security: ACLs covering the servers, SSH access only"
      ],
      action: "Build the final Mega Lab in Packet Tracer without looking at notes."
    }
  ];
  
  // --- DATA: Schedule ---
  const scheduleData = [
    { week: 1, mod: "Module 1", topic: "Network Fundamentals (Domain 1.0)" },
    { week: 2, mod: "Module 2", topic: "Network Access & VLANs (Domain 2.0)" },
    { week: 3, mod: "Module 3", topic: "STP & Wireless (Domain 2.0)" },
    { week: 4, mod: "Module 4", topic: "IP Connectivity - Routing (Domain 3.0)" },
    { week: 5, mod: "Module 5", topic: "IP Connectivity - OSPF (Domain 3.0)" },
    { week: 6, mod: "Module 6", topic: "Services - DHCP/NAT (Domain 4.0)" },
    { week: 7, mod: "Module 7", topic: "Security - Concepts (Domain 5.0)" },
    { week: 8, mod: "Module 8", topic: "Security - ACLs & VPNs (Domain 5.0)" },
    { week: 9, mod: "Module 9", topic: "Automation & SDN (Domain 6.0)" },
    { week: 10, mod: "Module 10", topic: "JSON/Config Mgmt (Domain 6.0)" },
    { week: 11, mod: "Module 11", topic: "Complete Review (All Domains)" },
    { week: 12, mod: "Module 12", topic: "Mega Lab & Exam Simulation" },
  ];
  
  // --- DATA: Labs ---
  const labsData = [
    {
      title: "1. Device Hardening (Beginner)",
      desc: "Suggida amniga aasaasiga ah ee Router/Switch.",
      scenario: "Scenario: Shirkaddu waxay soo iibsatay Router cusub. U bixi magac, xir Console-ka, oo samee Banner uga digaya dadka aan fasaxa haysan. (Basic Config)",
      code: `Router> enable
  Router# configure terminal
  Router(config)# hostname Office-Router
  Office-Router(config)# enable secret cisco@123
  Office-Router(config)# service password-encryption
  Office-Router(config)# banner motd # Authorized Access Only! #
  Office-Router(config)# line console 0
  Office-Router(config-line)# password consolepass
  Office-Router(config-line)# login
  Office-Router(config-line)# logging synchronous
  Office-Router(config-line)# exit`
    },
    {
      title: "2. Interface Config & Descriptions (Beginner)",
      desc: "Habaynta Port-yada iyo Dokumentiga.",
      scenario: "Scenario: Isku xir Router-ka iyo ISP (G0/0) iyo LAN-ka xafiiska (G0/1). Ku qor sharraxaad (description) port kasta si loo ogaado waxa ku xiran.",
      code: `Office-Router(config)# interface g0/0
  Office-Router(config-if)# description Link-to-ISP
  Office-Router(config-if)# ip address 203.0.113.10 255.255.255.252
  Office-Router(config-if)# no shutdown
  Office-Router(config-if)# exit
  
  Office-Router(config)# interface g0/1
  Office-Router(config-if)# description LAN-Gateway-for-Workstations
  Office-Router(config-if)# ip address 192.168.10.1 255.255.255.0
  Office-Router(config-if)# no shutdown
  Office-Router(config-if)# end
  Office-Router# show ip interface brief`
    },
    {
      title: "3. Neighbor Discovery (CDP/LLDP) (Beginner)",
      desc: "Ogaanshaha qalabka kuu dhow.",
      scenario: "Scenario: Waxaad timid xafiis cusub, mana haysatid map-ka shabakadda. Isticmaal CDP si aad u ogaato Switch-yada iyo Router-yada ku xiran qalabkaaga.",
      code: `! Check enabled protocols
  SW1# show cdp neighbors
  SW1# show cdp neighbors detail
  
  ! If using non-Cisco devices, use LLDP
  SW1(config)# lldp run
  SW1# show lldp neighbors`
    },
    {
      title: "4. VLANs & Access Ports (Intermediate)",
      desc: "Kala qaybinta Waaxyaha (VLANs).",
      scenario: "Scenario: Xafiisku wuxuu leeyahay waaxda HR (VLAN 10) iyo IT (VLAN 20). Abuur VLAN-yada oo ku xir PC-yada (Access Ports).",
      code: `SW1(config)# vlan 10
  SW1(config-vlan)# name HR-DEPT
  SW1(config-vlan)# exit
  SW1(config)# vlan 20
  SW1(config-vlan)# name IT-DEPT
  SW1(config-vlan)# exit
  
  ! Assign HR PC to Port 1-5
  SW1(config)# interface range f0/1 - 5
  SW1(config-if-range)# switchport mode access
  SW1(config-if-range)# switchport access vlan 10
  SW1(config-if-range)# exit
  
  ! Assign IT PC to Port 6-10
  SW1(config)# interface range f0/6 - 10
  SW1(config-if-range)# switchport mode access
  SW1(config-if-range)# switchport access vlan 20`
    },
    {
      title: "5. Router-on-a-Stick (Inter-VLAN) (Intermediate)",
      desc: "Isku xirka VLAN-yada kala duwan.",
      scenario: "Scenario: HR iyo IT ma wada hadli karaan. Isticmaal Router (R1) iyo Sub-interfaces si aad isugu xirto (Routing).",
      code: `! Configure Trunk on Switch side first
  SW1(config)# interface g0/1
  SW1(config-if)# switchport mode trunk
  
  ! Router Configuration
  R1(config)# interface g0/1
  R1(config-if)# no shutdown
  R1(config-if)# exit
  
  ! Sub-interface for HR (VLAN 10)
  R1(config)# interface g0/1.10
  R1(config-subif)# encapsulation dot1q 10
  R1(config-subif)# ip address 192.168.10.1 255.255.255.0
  
  ! Sub-interface for IT (VLAN 20)
  R1(config)# interface g0/1.20
  R1(config-subif)# encapsulation dot1q 20
  R1(config-subif)# ip address 192.168.20.1 255.255.255.0`
    },
    {
      title: "6. Static Routing (Intermediate)",
      desc: "Isku xirka laba laamood (Branches).",
      scenario: "Scenario: Xarunta dhexe (HQ) waxay rabtaa inay la xiriirto laanta 'Branch A' (192.168.20.0). Next-hop waa 10.0.0.2.",
      code: `HQ-Router(config)# ip route 192.168.20.0 255.255.255.0 10.0.0.2
  
  ! Backup Route (Floating Static) with higher AD
  HQ-Router(config)# ip route 192.168.20.0 255.255.255.0 10.0.0.6 200
  
  ! Verify
  HQ-Router# show ip route static`
    },
    {
      title: "7. DHCP Server (Advanced)",
      desc: "IP siinta tooska ah.",
      scenario: "Scenario: Workstation-yada ha helaan IP, Gateway, iyo DNS si toos ah. Router-ka ka dhig Server.",
      code: `R1(config)# ip dhcp pool OFFICE-POOL
  R1(dhcp-config)# network 192.168.10.0 255.255.255.0
  R1(dhcp-config)# default-router 192.168.10.1
  R1(dhcp-config)# dns-server 8.8.8.8
  R1(dhcp-config)# lease 7
  R1(dhcp-config)# exit
  R1(config)# ip dhcp excluded-address 192.168.10.1 192.168.10.10`
    },
    {
      title: "8. Port Security (Advanced)",
      desc: "Xaddidaadda cidda soo gali karta Switch-ka.",
      scenario: "Scenario: Xafiiska Reception-ka, kaliya hal PC ayaa la ogol yahay in lagu xiro Port F0/1. Haddii mid kale lagu xiro, Port-gu ha xirmo.",
      code: `SW1(config)# interface f0/1
  SW1(config-if)# switchport mode access
  SW1(config-if)# switchport port-security
  SW1(config-if)# switchport port-security maximum 1
  SW1(config-if)# switchport port-security mac-address sticky
  SW1(config-if)# switchport port-security violation shutdown
  SW1(config-if)# end
  SW1# show port-security interface f0/1`
    },
    {
      title: "9. NAT Overload (PAT) (Advanced)",
      desc: "Internet u ogolaanshaha Xafiiska.",
      scenario: "Scenario: Dhammaan shaqaalaha (192.168.10.0/24) waa inay Internetka ka galaan hal Public IP oo ISP bixiyay.",
      code: `R1(config)# access-list 1 permit 192.168.10.0 0.0.0.255
  R1(config)# interface g0/0
  R1(config-if)# ip nat outside
  R1(config)# interface g0/1
  R1(config-if)# ip nat inside
  R1(config)# ip nat inside source list 1 interface g0/0 overload`
    },
    {
      title: "10. Standard ACL (Advanced)",
      desc: "Security Filtering.",
      scenario: "Scenario: Diid PC-ga 'Guest' (192.168.10.50) inuu galo Server-ka Accounting-ka, laakiin kuwa kale fasax.",
      code: `R1(config)# access-list 10 deny host 192.168.10.50
  R1(config)# access-list 10 permit any
  R1(config)# interface g0/1
  R1(config-if)# ip access-group 10 out`
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
  const [timeLeft, setTimeLeft] = useState({ weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [localDate, setLocalDate] = useState(examDate || "");
  const [isEditing, setIsEditing] = useState(!examDate);

  // Sync local state only when entering edit mode or initial load
  useEffect(() => {
    if (!examDate) setIsEditing(true);
    setLocalDate(examDate || "");
  }, [examDate]);

  useEffect(() => {
    if (!examDate) return;
    
    const calculateTime = () => {
      const target = new Date(examDate);
      const now = new Date();
      const difference = target - now;
      
      if (difference > 0) {
        return {
          weeks: Math.floor(difference / (1000 * 60 * 60 * 24 * 7)),
          days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 7),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTime());
    const timer = setInterval(() => setTimeLeft(calculateTime()), 1000); // update every second
    return () => clearInterval(timer);
  }, [examDate]);

  const handleSave = () => {
      setExamDate(localDate);
      setIsEditing(false);
  };

  const isTimeUp = timeLeft.weeks === 0 && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && examDate;

  const TimeBlock = ({ value, label, color }) => (
    <div className="text-center group cursor-default min-w-[50px] md:min-w-[60px]">
      <span className={`text-3xl md:text-5xl font-black block tracking-tighter transition-colors ${isDark ? `${color}-400 group-hover:${color}-300` : `${color}-600 group-hover:${color}-500`}`}>
        {value}
      </span>
      <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{label}</span>
    </div>
  );

  const Separator = () => (
    <div className={`h-8 w-px md:h-12 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
  );

  return (
    <div className={`p-6 rounded-2xl border shadow-sm transition-all mb-8
      ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}
    `}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          <Clock className="text-blue-500" size={20} /> Exam Countdown
        </h3>
        <button 
          onClick={() => {
            if (isEditing) handleSave();
            else setIsEditing(true);
          }}
          className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all
             ${isDark 
                ? 'border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700' 
                : 'border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-slate-50'}
          `}
        >
          {isEditing ? 'Save Date' : 'Edit Date'}
        </button>
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-3 animate-fade-in">
          <label className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Set your target exam date:</label>
          <input 
            type="date" 
            value={localDate} 
            onChange={(e) => setLocalDate(e.target.value)}
            className={`p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 w-full font-mono
              ${isDark ? 'bg-slate-900 border-slate-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}
            `}
          />
          <p className="text-[10px] text-slate-500">Pick a date in the future to start the countdown.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 md:gap-6 items-center justify-center py-2">
          {isTimeUp ? (
             <div className={`text-center font-bold text-xl ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                 Good Luck on your Exam! 🚀
             </div>
          ) : (
            <>
              <TimeBlock value={timeLeft.weeks} label="Weeks" color="text-blue" />
              <Separator />
              <TimeBlock value={timeLeft.days} label="Days" color="text-indigo" />
              <Separator />
              <TimeBlock value={timeLeft.hours} label="Hours" color="text-purple" />
              <Separator />
              <TimeBlock value={timeLeft.minutes} label="Mins" color="text-pink" />
              <Separator />
              <TimeBlock value={timeLeft.seconds} label="Secs" color="text-rose" />
            </>
          )}
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


const Notebook = ({ modules, userNotes, isDark }) => {
  const hasNotes = Object.values(userNotes).some(note => note.trim().length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>My Study Notebook</h2>
      <p className={`mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        Review all your notes from each learning module.
      </p>

      <div className="grid gap-6">
        {hasNotes ? (
           modules.map(mod => {
             const note = userNotes[mod.id];
             if (!note || !note.trim()) return null;
             return (
               <div key={mod.id} className={`p-6 rounded-xl border shadow-sm transition-all hover:shadow-md ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-dashed border-gray-200 dark:border-slate-700">
                     <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                        <BookOpen size={20} />
                     </div>
                     <h3 className={`font-bold text-lg ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{mod.title}</h3>
                  </div>
                  <div className={`p-4 rounded-lg whitespace-pre-wrap font-mono text-sm leading-relaxed ${isDark ? 'bg-slate-900 text-slate-300 border border-slate-700' : 'bg-yellow-50 text-slate-800 border border-yellow-100'}`}>
                     {note}
                  </div>
               </div>
             )
           })
        ) : (
           <div className={`text-center py-20 rounded-2xl border-2 border-dashed ${isDark ? 'border-slate-700 text-slate-500' : 'border-gray-200 text-slate-400'}`}>
              <FileText size={48} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">No Notes Yet</h3>
              <p className="max-w-md mx-auto">Go to the Modules section and add notes to track your key takeaways and lab results.</p>
           </div>
        )}
      </div>
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
          <div className="text-center py-12 px-4 animate-fade-in">
            {/* Hero Section */}
            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3 transition-transform hover:rotate-6
               ${darkMode ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-900/40' : 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-blue-200'}
            `}>
              <BookOpen size={48} />
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Cisco CCNA</span> <br className="hidden md:block" /> Exam in 12 Weeks.
            </h1>
            
            <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Your ultimate interactive guide to the 200-301 certification. 
              Track progress, practice labs, and simulate the CLI environment all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button 
                onClick={() => setActiveTab('modules')}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 group"
              >
                Start Learning <ChevronDown className="-rotate-90 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
              <button 
                 onClick={() => setActiveTab('labs')}
                 className={`px-8 py-4 rounded-xl font-bold border transition-colors flex items-center justify-center gap-2
                  ${darkMode ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-750' : 'bg-white text-slate-700 border-slate-200 hover:bg-gray-50'}
                 `}
              >
                <Terminal size={18} /> View Labs
              </button>
            </div>

            {/* Countdown Section */}
            <div className="max-w-3xl mx-auto mb-20">
               <CountdownTimer examDate={examDate} setExamDate={setExamDate} isDark={darkMode} />
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-6xl mx-auto mb-20">
              {[
                { 
                  label: "Structured Modules", 
                  desc: "12 Core modules covering 100% of exam topics.",
                  val: `${Math.round(globalProgress)}% Done`, 
                  color: "text-blue-500", 
                  bg: "bg-blue-500/10",
                  icon: Layers 
                },
                { 
                  label: "CLI Simulator", 
                  desc: "Practice commands directly in your browser without equipment.",
                  val: "Interactive", 
                  color: "text-purple-500", 
                  bg: "bg-purple-500/10",
                  icon: Terminal 
                },
                { 
                  label: "Study Tools", 
                  desc: "Built-in Flashcards, Cheatsheets, and Quizzes.",
                  val: "Included", 
                  color: "text-pink-500", 
                  bg: "bg-pink-500/10",
                  icon: Brain 
                },
              ].map((stat, i) => (
                <div key={i} className={`p-8 rounded-3xl border transition-all hover:shadow-lg hover:-translate-y-1
                  ${darkMode ? 'bg-slate-800 border-slate-700 hover:shadow-slate-900/50' : 'bg-white border-slate-100 hover:shadow-slate-200/50'}
                `}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${stat.bg}`}>
                    <stat.icon size={28} className={stat.color} />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{stat.label}</h3>
                  <p className={`text-sm mb-4 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{stat.desc}</p>
                  <div className={`text-xs font-bold uppercase tracking-wider ${stat.color}`}>
                    {stat.val}
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
             
             <div className={`mt-12 p-6 rounded-xl border flex flex-col items-center text-center
                ${darkMode ? 'border-purple-900/50 bg-purple-900/10' : 'border-purple-100 bg-purple-50'}
             `}>
               <h4 className={`font-bold mb-2 flex items-center gap-2 ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                 <Award size={20} /> About This Roadmap
               </h4>
               <p className={`text-sm max-w-2xl mb-4 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                 This interactive roadmap is designed to help you track your progress, practice labs, and master the concepts required for the **Cisco Certified Network Associate (CCNA 200-301)** exam. Use the tools provided to organize your study plan effectively.
               </p>
               <p className={`text-xs italic ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                 Updated for the latest exam objectives (v1.1)
               </p>
             </div>
          </div>
        );
      
      case 'notebook':
         return <Notebook modules={modulesData} userNotes={userNotes} isDark={darkMode} />;

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
                      <DropdownItem id="notebook" label="My Notebook" icon={FileText} />
                      <div className={`h-px my-1 ${darkMode ? 'bg-slate-800' : 'bg-gray-100'}`}></div>
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
           {/* Social Icons */}
           {[
             { icon: ExternalLink, link: "https://github.com/Abdiwahaab10", label: "GitHub" },
             { icon: Clock, link: "#", label: "History" }, // Using generic icons as placeholders for real social not in Lucide imp
             { icon: Terminal, link: "#", label: "CLI" }
           ].map((item, i) => (
             <a 
               key={i} 
               href={item.link}
               target="_blank"
               rel="noopener noreferrer"
               aria-label={item.label}
               className={`w-10 h-10 rounded-full flex items-center justify-center transition-all transform hover:scale-110
                ${darkMode ? 'bg-slate-800 hover:bg-twitter-blue hover:text-white' : 'bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white'}
             `}
             >
               <item.icon size={18} />
             </a>
           ))}
        </div>
        <p className="text-sm border-t border-slate-800/50 pt-6 mt-2 max-w-xs mx-auto">
          &copy; {new Date().getFullYear()} CCNA Networking Roadmap. <br/>
          <span className="opacity-75">All Rights Reserved.</span>
        </p>
      </footer>
    </div>
  );
};

// Render the app
const root = createRoot(document.getElementById('root'));
root.render(<MainApp />);
