import { TopicLearningContent } from '../../types';

export const NETWORKING_SE_REVISION_EXTENDED_CONTENT: Record<string, TopicLearningContent> = {
  // ===================== COMPUTER NETWORKS =====================
  'cn-ip-addressing': {
    topicId: 'cn-ip-addressing',
    topicName: 'IP Addressing: IPv4 Classes, CIDR Subnetting & IPv6',
    subjectId: 'computer-networks',
    whatIsIt: 'Network layer logical addressing systems: 32-bit IPv4 classful and CIDR subnet architectures, address range calculations, and 128-bit hexadecimal IPv6 transitions.',
    simpleExplanation: 'Every house in the world needs a unique mailing address so mail carriers know where to deliver letters. On the internet, every phone, laptop, and server needs an IP address so packets know where to go. IPv4 was like 8-digit phone numbers (which eventually ran out), and IPv6 is like assigning a unique phone number to every grain of sand on Earth.',
    technicalExplanation: 'IPv4 uses 32-bit addresses formatted as 4 dotted-decimal octets (e.g., 192.168.1.1). Classful Addressing: Class A (0.0.0.0 to 127.255.255.255, default mask /8, massive networks), Class B (128.0.0.0 to 191.255.255.255, mask /16), Class C (192.0.0.0 to 223.255.255.255, mask /24), Class D (224.0.0.0 to 239.255.255.255, Multicast), Class E (240.0.0.0 to 255.255.255.255, Experimental/Reserved). CIDR (Classless Inter-Domain Routing) uses variable-length subnet masks (VLSM): /n denotes n network bits and (32 - n) host bits. Total usable hosts formula: 2^(32 - n) - 2 (subtracting 2 for Network ID and Broadcast address). IPv6 uses 128 bits formatted as 8 groups of 4 hexadecimal digits separated by colons, eliminating address exhaustion.',
    importantDefinitions: [
      { term: 'CIDR Notation', definition: 'A slash notation (e.g., /24) indicating the exact count of leading contiguous 1-bits in the subnet mask representing the network prefix.' },
      { term: 'Subnet Mask', definition: 'A 32-bit number used in IPv4 to distinguish between the network portion and the host portion of an IP address.' },
      { term: 'Network ID', definition: 'The lowest address in a subnet where all host bits are zeroes, identifying the subnet itself.' },
      { term: 'Directed Broadcast Address', definition: 'The highest address in a subnet where all host bits are ones, used to send a packet to all hosts on that local network.' },
      { term: 'Loopback Address', definition: '127.0.0.1 in IPv4 (or ::1 in IPv6), routing traffic back internally to the local machine without hitting the physical network interface.' }
    ],
    keyConcepts: [
      'Usable Host Calculation: Number of usable host IP addresses = 2^h - 2, where h is the number of host bits.',
      'Subnet bit borrowing: Borrowing k bits from host field creates 2^k subnets.',
      'Special Addresses: 127.0.0.1 (Loopback), 169.254.x.x (APIPA link-local), 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 (RFC 1918 Private ranges).',
      'IPv6 Features: 128-bit address space (2^128 addresses), built-in IPsec, auto-configuration (SLAAC), and elimination of broadcast addresses (replaced by multicast).'
    ],
    example: {
      type: 'text',
      title: 'Subnetting Calculation: 192.168.10.0/26',
      explanation: 'Calculate Subnet Mask, Subnet Count, Usable Hosts, and Broadcast Address',
      code: `
Given Network: 192.168.10.0/26

1. Subnet Mask:
   Prefix /26 means 26 ones and 6 zeroes:
   11111111 . 11111111 . 11111111 . 11000000
   Decimal: 255.255.255.192

2. Host bits (h):
   h = 32 - 26 = 6 bits.

3. Total addresses per subnet:
   2^6 = 64 addresses.

4. Usable hosts per subnet:
   2^h - 2 = 64 - 2 = 62 usable hosts!

5. Subnet 1 Breakdown:
   - Network ID: 192.168.10.0
   - First usable IP: 192.168.10.1
   - Last usable IP: 192.168.10.62
   - Broadcast Address: 192.168.10.63
      `
    },
    commonInterviewQuestions: [
      {
        question: 'Why do we subtract 2 when calculating usable host addresses in an IPv4 subnet?',
        answer: 'We subtract 2 because the very first address in the subnet (where all host bits are 0) is reserved as the Network Identifier, and the very last address in the subnet (where all host bits are 1) is reserved as the Directed Broadcast Address.'
      },
      {
        question: 'What are the RFC 1918 Private IP address ranges and why are they used?',
        answer: 'Private IP ranges are:\n- Class A: 10.0.0.0 to 10.255.255.255 (/8)\n- Class B: 172.16.0.0 to 172.31.255.255 (/12)\n- Class C: 192.168.0.0 to 192.168.255.255 (/16)\nThey are reserved for internal local area networks (LANs) and are not routable across the public internet. Organizations use them with NAT (Network Address Translation) to conserve scarce public IPv4 addresses.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assigning the network address or broadcast address to an individual computer host.',
        correction: 'Hosts can only be assigned addresses between (Network ID + 1) and (Broadcast ID - 1).',
        why: 'Operating systems reject assigning host bits of all 0s or all 1s.'
      }
    ],
    quickRevision: [
      'IPv4 is 32-bit dotted-decimal; IPv6 is 128-bit hexadecimal.',
      'Classes: A (0-127), B (128-191), C (192-223), D (Multicast 224-239).',
      'Usable hosts formula: 2^(32 - prefix) - 2.',
      '127.0.0.1 is local loopback testing address.'
    ],
    practiceQuestions: [
      {
        id: 'cn-ip-pq1',
        question: 'How many usable host IP addresses are available in a /28 subnet?',
        options: ['14', '16', '30', '32'],
        correctOptionIndex: 0,
        explanation: 'For a /28 subnet, the number of host bits is 32 - 28 = 4 bits. Usable hosts = 2^4 - 2 = 16 - 2 = 14 usable hosts.'
      }
    ]
  },

  'cn-application-protocols': {
    topicId: 'cn-application-protocols',
    topicName: 'Application Protocols: HTTP, HTTPS, DNS & DHCP',
    subjectId: 'computer-networks',
    whatIsIt: 'Application layer network protocols managing user-facing web services, domain name resolution, encrypted transport security, and automatic host network configurations.',
    simpleExplanation: 'When you open your laptop: DHCP automatically gives you an IP address so you can join Wi-Fi; DNS translates friendly website names like "google.com" into the computer numbers (IP addresses); HTTP requests the web page; and HTTPS wraps everything in encrypted code so coffee-shop eavesdroppers cannot steal your passwords.',
    technicalExplanation: '1) HTTP (Port 80): A stateless, request-response ASCII application protocol operating over TCP. Request methods: GET (idempotent, query strings in URL), POST (submits payload in request body), PUT (replaces resource), DELETE. Status Codes: 2xx (Success, 200 OK), 3xx (Redirection, 301 Moved Permanently), 4xx (Client Error, 404 Not Found, 403 Forbidden), 5xx (Server Error, 500 Internal Error, 502 Bad Gateway). 2) HTTPS (Port 443): HTTP secured over TLS/SSL, encrypting HTTP traffic using asymmetric cryptography for handshakes and symmetric AES for data transfer. 3) DNS (Port 53 UDP/TCP): Hierarchical distributed naming system mapping domain names to IP addresses (Root servers -> TLD servers -> Authoritative servers). Record types: A (IPv4), AAAA (IPv6), CNAME (canonical alias), MX (mail exchange). 4) DHCP (Port 67/68 UDP): Dynamic Host Configuration Protocol using the 4-step DORA process: Discover -> Offer -> Request -> Acknowledge.',
    importantDefinitions: [
      { term: 'DNS (Domain Name System)', definition: 'A hierarchical distributed database that translates human-friendly domain names (e.g., example.com) into numerical IP addresses.' },
      { term: 'DHCP DORA Process', definition: 'The 4-way exchange (Discover, Offer, Request, Acknowledge) by which a client dynamically leases an IP address, gateway, and DNS servers from a DHCP server.' },
      { term: 'TLS / SSL Handshake', definition: 'A cryptographic handshake establishing identity using digital certificates and negotiating a shared symmetric session key for HTTPS.' },
      { term: 'Idempotent Method', definition: 'An HTTP method (like GET, PUT, DELETE) where making multiple identical requests has the same intended effect on the server as making a single request.' }
    ],
    keyConcepts: [
      'HTTP Status codes: 200 (OK), 301 (Permanent Redirect), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Internal Error), 503 (Service Unavailable).',
      'DNS primarily uses UDP port 53 for speed; falls back to TCP port 53 for zone transfers or responses exceeding 512 bytes.',
      'DORA broadcast: DHCP Discover and Request are sent as broadcasts (255.255.255.255) because the client has no assigned IP address yet.',
      'HTTPS uses asymmetric RSA/ECC public-key cryptography to securely exchange a fast symmetric AES session key.'
    ],
    example: {
      type: 'diagram',
      title: 'DHCP DORA Sequence Flow',
      explanation: 'How a new client automatically obtains network configuration',
      diagramAscii: `
Client (0.0.0.0)                                    DHCP Server (192.168.1.1)
   |                                                        |
   |--- 1. DHCP DISCOVER (Broadcast: 255.255.255.255) ----->|
   |    "Is there any DHCP server available?"               |
   |                                                        |
   |<-- 2. DHCP OFFER (Unicast or Broadcast) ---------------|
   |    "I offer you IP: 192.168.1.105 with Mask /24"      |
   |                                                        |
   |--- 3. DHCP REQUEST (Broadcast) ----------------------->|
   |    "I accept the offer for 192.168.1.105!"             |
   |                                                        |
   |<-- 4. DHCP ACK (Unicast/Broadcast) -------------------|
   |    "Lease confirmed! Gateway: 192.168.1.1, DNS: 8.8.8.8|
      `
    },
    commonInterviewQuestions: [
      {
        question: 'What happens behind the scenes from the moment you type a URL into a browser and press Enter?',
        answer: '1. Browser checks DNS cache (browser, OS, router). If missed, performs recursive DNS resolution to obtain the server’s IP address.\n2. Browser initiates a TCP 3-way handshake (SYN, SYN-ACK, ACK) on port 80 or 443.\n3. If HTTPS, performs TLS/SSL handshake to negotiate encryption keys and verify server certificate.\n4. Browser sends HTTP GET request.\n5. Server processes request and returns HTTP response (HTML, CSS, JS).\n6. Browser parses HTML DOM, loads CSS/assets, and renders the webpage.'
      },
      {
        question: 'Why does DNS primarily use UDP instead of TCP?',
        answer: 'DNS queries are short, lightweight, and single-packet requests. UDP avoids the latency overhead of establishing a 3-way TCP connection before every query. If a UDP packet is lost, the client application simply retransmits after a short timeout.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Believing HTTPS encrypts the destination IP address or domain name.',
        correction: 'HTTPS encrypts the HTTP payload (headers, cookies, URL path, body), but the IP address and SNI (Server Name Indication) remain visible at transport/network layers.',
        why: 'Routers need the destination IP to route packets across intermediate hops.'
      }
    ],
    quickRevision: [
      'HTTP: Port 80, stateless; HTTPS: Port 443, TLS encrypted.',
      'DNS: Port 53 (UDP), translates names to IPs.',
      'DHCP DORA: Discover, Offer, Request, Acknowledge.',
      'Status codes: 2xx success, 3xx redirect, 4xx client, 5xx server.'
    ],
    practiceQuestions: [
      {
        id: 'cn-proto-pq1',
        question: 'What is the correct 4-step sequence of DHCP message exchanges for acquiring an IP address?',
        options: [
          'Discover, Offer, Request, Acknowledge',
          'Detect, Open, Receive, Accept',
          'Demand, Obtain, Reserve, Allocate',
          'Deliver, Order, Register, Approve'
        ],
        correctOptionIndex: 0,
        explanation: 'DHCP operates via the DORA sequence: Discover, Offer, Request, Acknowledge.'
      }
    ]
  },

  'cn-devices-security': {
    topicId: 'cn-devices-security',
    topicName: 'Routing, Switching, Ports, Firewalls & Security',
    subjectId: 'computer-networks',
    whatIsIt: 'Network infrastructure hardware (Hubs, Switches, Routers, Gateways), standard transport port assignments, firewall architectures, and foundational cybersecurity principles.',
    simpleExplanation: 'A Hub is a loud person yelling every message to everyone in the room. A Switch is a smart mailroom clerk who reads the recipient name and hands the letter only to the right desk. A Router is an international airport dispatcher sending planes between different countries. A Firewall is the armed security checkpoint at the gate.',
    technicalExplanation: 'Network Devices across layers: 1) Hub (Layer 1 Physical): Multi-port repeater; broadcasts all incoming electrical signals to all ports; single shared collision domain and broadcast domain. 2) Switch (Layer 2 Data Link): Operates on MAC addresses; maintains a CAM (Content Addressable Memory) MAC address table; provides dedicated collision domains per port, but a single broadcast domain; supports VLANs. 3) Router (Layer 3 Network): Connects distinct logical subnets; forwards packets based on destination IP addresses using routing tables; breaks broadcast domains. Security: Firewalls inspect traffic via Packet Filtering (stateless, checks headers), Stateful Inspection (tracks TCP connection state in state tables), or Application Proxy (Layer 7 deep inspection). Cryptography: Symmetric (AES, DES: single shared key, ultra-fast) vs Asymmetric (RSA, ECC: public key for encryption, private key for decryption).',
    importantDefinitions: [
      { term: 'Collision Domain', definition: 'A network segment where data packets can collide with one another if transmitted simultaneously (broken up by Switches and Routers).' },
      { term: 'Broadcast Domain', definition: 'A network segment containing all devices that receive a broadcast frame emitted by any member (broken up strictly by Routers).' },
      { term: 'Stateful Firewall', definition: 'A firewall that tracks the active state and context of network connections (e.g., TCP SYN, ESTABLISHED) to permit legitimate return traffic.' },
      { term: 'Asymmetric Cryptography', definition: 'A cryptographic system using a mathematically linked public-private key pair for encryption and digital signatures.' }
    ],
    keyConcepts: [
      'Device layer comparison: Hub = Layer 1; Switch = Layer 2 (MAC); Router = Layer 3 (IP).',
      'Collision domains vs Broadcast domains: A 16-port switch has 16 collision domains and 1 broadcast domain. A router has separate broadcast domains on every port.',
      'Well-Known Ports: 20/21 (FTP), 22 (SSH), 23 (Telnet), 25 (SMTP), 53 (DNS), 80 (HTTP), 110 (POP3), 143 (IMAP), 443 (HTTPS), 3306 (MySQL).',
      'CIA Triad: Confidentiality (encryption), Integrity (hashing/checksums), Availability (redundancy/DDoS protection).'
    ],
    example: {
      type: 'text',
      title: 'Domain Comparison Table: Hub vs Switch vs Router',
      explanation: 'Analysis of an 8-port device setup',
      code: `
Device (8 ports connected to 8 PCs):
1. 8-Port HUB:
   - Collision Domains: 1 (All 8 PCs share 1 collision domain)
   - Broadcast Domains: 1

2. 8-Port SWITCH:
   - Collision Domains: 8 (Each port is an isolated collision domain!)
   - Broadcast Domains: 1 (A broadcast frame goes to all ports)

3. 8-Port ROUTER (each port on different subnet):
   - Collision Domains: 8
   - Broadcast Domains: 8 (Routers do not forward Layer 2 broadcasts!)
      `
    },
    commonInterviewQuestions: [
      {
        question: 'What is the difference between a collision domain and a broadcast domain?',
        answer: 'A Collision Domain is a network segment where simultaneous transmissions from two devices collide. Switches break collision domains (each switch port is its own collision domain). A Broadcast Domain is the set of all devices that receive a broadcast packet sent by any host. Switches forward broadcasts to all ports; Routers do NOT forward broadcasts, isolating broadcast domains.'
      },
      {
        question: 'What is the difference between Symmetric and Asymmetric encryption, and where are they used together?',
        answer: 'Symmetric encryption uses the exact same secret key for both encryption and decryption (fast, efficient for large data like AES). Asymmetric encryption uses a public key for encryption and a private key for decryption (slower, solves key distribution like RSA). In HTTPS/TLS, they are used together: Asymmetric encryption is used during the handshake to securely exchange a symmetric session key, and Symmetric encryption encrypts all subsequent application data.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assuming a network switch breaks broadcast domains.',
        correction: 'Standard Layer 2 switches break COLLISION domains, but all ports remain in the same BROADCAST domain (unless VLANs are configured).',
        why: 'Switches flood broadcast MAC addresses (FF:FF:FF:FF:FF:FF) out of every port.'
      }
    ],
    quickRevision: [
      'Hub: Layer 1, 1 collision domain, 1 broadcast domain.',
      'Switch: Layer 2 (MAC), separate collision domain per port.',
      'Router: Layer 3 (IP), separates broadcast domains.',
      'Ports: 22 (SSH), 53 (DNS), 80 (HTTP), 443 (HTTPS).'
    ],
    practiceQuestions: [
      {
        id: 'cn-dev-pq1',
        question: 'Which networking device operates at Layer 3 and separates broadcast domains?',
        options: ['Hub', 'Repeater', 'Bridge', 'Router'],
        correctOptionIndex: 3,
        explanation: 'Routers operate at Layer 3 (Network Layer) and do not forward Layer 2 broadcasts, creating isolated broadcast domains.'
      }
    ]
  },

  // ===================== SOFTWARE ENGINEERING =====================
  'se-requirements-design': {
    topicId: 'se-requirements-design',
    topicName: 'Requirements Engineering & Software Design Principles',
    subjectId: 'software-engineering',
    whatIsIt: 'The foundational software engineering discipline of gathering, analyzing, specifying, and validating requirements (SRS), coupled with architectural design principles (Cohesion, Coupling, and SOLID).',
    simpleExplanation: 'Before cooking for a banquet, you ask the guests what they want to eat, dietary allergies, and when dinner starts (Requirements Engineering & SRS). High Cohesion is like having a kitchen tool that does one job perfectly (like a chef’s knife). Low Coupling means the stove doesn’t break down just because someone turned off the sink.',
    technicalExplanation: '1) Requirements Engineering: Feasibility Study -> Elicitation (interviews, workshops) -> Analysis -> Specification (Software Requirements Specification - SRS document) -> Validation. Requirements are classified into Functional Requirements (system behaviors, inputs, outputs) and Non-Functional Requirements (quality attributes: performance, scalability, security, usability). 2) Modularity Principles: High Cohesion (internal elements of a module belong together and serve a single well-defined purpose; Functional Cohesion is best) and Low Coupling (modules are independent and minimally interconnected; Data Coupling is best, Content Coupling is worst). 3) SOLID Principles: S (Single Responsibility), O (Open/Closed), L (Liskov Substitution), I (Interface Segregation), D (Dependency Inversion).',
    importantDefinitions: [
      { term: 'Software Requirements Specification (SRS)', definition: 'A formal contract document detailing all functional and non-functional requirements, constraints, and external interfaces of a software system.' },
      { term: 'Cohesion', definition: 'A metric measuring the degree to which elements within a single module are focused on executing a single, well-defined task (High Cohesion is desirable).' },
      { term: 'Coupling', definition: 'A metric measuring the degree of interdependence and interconnectedness between distinct software modules (Low Coupling is desirable).' },
      { term: 'SOLID Principles', definition: 'Five object-oriented design principles formulated to make software systems more understandable, flexible, and maintainable.' }
    ],
    keyConcepts: [
      'Desirable architectural goal: HIGH COHESION and LOW COUPLING.',
      'Cohesion levels (Worst to Best): Coincidental < Logical < Temporal < Procedural < Communicational < Sequential < Functional.',
      'Coupling levels (Worst to Best): Content < Common (global data) < Control < Stamp < Data.',
      'SRS Characteristics (IEEE 830): Correct, Unambiguous, Complete, Consistent, Verifiable, Modifiable, Traceable.'
    ],
    example: {
      type: 'text',
      title: 'Cohesion & Coupling Architectural Spectrum',
      explanation: 'Ranking modular design from worst to best',
      code: `
COHESION (Internal focus of a module - High is best!):
Worst:   1. Coincidental (random functions dumped together)
         2. Logical (grouping all input routines)
         3. Temporal (all startup tasks executed at same time)
         4. Procedural (functions executed in sequence)
         5. Communicational (functions operate on same input data)
         6. Sequential (output of one function is input of next)
Best:    7. Functional (every part works toward ONE single purpose)

COUPLING (Interdependence between modules - Low is best!):
Worst:   1. Content (one module modifies internal code/data of another)
         2. Common (modules share global variables)
         3. Control (one module passes flags dictating another's logic)
         4. Stamp (modules pass entire data structures but use few fields)
Best:    5. Data (modules communicate strictly by passing scalar parameters)
      `
    },
    commonInterviewQuestions: [
      {
        question: 'Explain the difference between Functional and Non-Functional requirements with examples.',
        answer: 'Functional Requirements define WHAT the system must specifically do (e.g., "The system shall allow users to transfer funds between accounts", "The system shall generate a monthly PDF invoice"). Non-Functional Requirements specify HOW the system must perform or quality constraints (e.g., "The transaction must complete within 200 milliseconds", "The system must maintain 99.99% uptime", "All passwords must be hashed using bcrypt").'
      },
      {
        question: 'Why is High Cohesion with Low Coupling considered the golden rule of software architecture?',
        answer: 'High Cohesion ensures that each module does one job completely and clearly, making it easier to read, test, and debug. Low Coupling ensures that changes inside one module do not ripple and break unrelated parts of the codebase, enabling independent development, deployment, and reusability.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Confusing Cohesion with Coupling.',
        correction: 'Cohesion is INTERNAL (within a single module); Coupling is EXTERNAL (between different modules).',
        why: 'High cohesion = strong internal bond; Low coupling = loose external dependency.'
      }
    ],
    quickRevision: [
      'SRS: Functional (what it does) vs Non-Functional (performance/security).',
      'Desirable: High Cohesion (Functional is best), Low Coupling (Data is best).',
      'Worst Cohesion: Coincidental; Worst Coupling: Content.',
      'SOLID: Single responsibility, Open/closed, Liskov, Interface segregation, Dependency inversion.'
    ],
    practiceQuestions: [
      {
        id: 'se-req-pq1',
        question: 'Which of the following represents the most desirable coupling between software modules?',
        options: ['Content Coupling', 'Common Coupling', 'Control Coupling', 'Data Coupling'],
        correctOptionIndex: 3,
        explanation: 'Data Coupling is the weakest and most desirable form of coupling, where modules interact strictly by passing necessary data arguments.'
      }
    ]
  },

  'se-testing-pyramid': {
    topicId: 'se-testing-pyramid',
    topicName: 'Software Testing: Unit, Integration, System & Quality',
    subjectId: 'software-engineering',
    whatIsIt: 'Software Quality Assurance (SQA) methodologies, test execution hierarchies (The Testing Pyramid: Unit, Integration, System, Acceptance), Black-Box vs White-Box testing techniques, and Git version control.',
    simpleExplanation: 'Testing software is like testing a car: 1) Unit testing tests the spark plug and battery on a test bench alone. 2) Integration testing connects the engine to the transmission to see if they rotate together. 3) System testing tests the assembled car on a test track. 4) Acceptance testing lets the customer test drive it before buying.',
    technicalExplanation: 'The Testing Pyramid advocates for a large base of fast, automated Unit Tests, a middle tier of Integration Tests, and a lean apex of End-to-End / System Tests. Methodologies: 1) White-Box (Structural) Testing: Tests internal logic with source code visibility; techniques include Statement Coverage, Branch/Decision Coverage, Condition Coverage, and Cyclomatic Complexity (V(G) = E - N + 2P); 2) Black-Box (Functional) Testing: Tests requirements without viewing code; techniques include Equivalence Partitioning (dividing inputs into valid/invalid classes) and Boundary Value Analysis (BVA: testing at min, min+, nominal, max-, max boundaries); 3) Levels of Testing: Unit -> Integration (Big Bang, Top-Down with stubs, Bottom-Up with drivers) -> System -> Acceptance (Alpha: by internal users at developer site; Beta: by external users at user sites).',
    importantDefinitions: [
      { term: 'Equivalence Partitioning', definition: 'A black-box testing technique that divides input domains into classes of equivalent data from which test cases can be derived.' },
      { term: 'Boundary Value Analysis (BVA)', definition: 'A testing technique focusing on inputs at the boundaries (limits) of input ranges, where defect density is statistically highest.' },
      { term: 'Cyclomatic Complexity', definition: 'A quantitative software metric developed by Thomas McCabe that measures the number of linearly independent paths through a program: V(G) = E - N + 2P.' },
      { term: 'Stub vs Driver', definition: 'A Stub is a dummy module called by the module under test (used in Top-Down integration); a Driver is a dummy calling module that invokes the module under test (used in Bottom-Up integration).' }
    ],
    keyConcepts: [
      'Testing Levels: Unit -> Integration -> System -> Acceptance (U-I-S-A).',
      'Boundary Value Analysis rule: For an input range [a, b], test cases should be: a, a+1, nominal, b-1, b.',
      'McCabe Cyclomatic Complexity: V(G) = E - N + 2 (where E = edges, N = nodes in control flow graph), or V(G) = Predicate Nodes + 1.',
      'Alpha testing (developer environment) vs Beta testing (real-world customer environment).'
    ],
    example: {
      type: 'text',
      title: 'Boundary Value Analysis (BVA) Test Suite Example',
      explanation: 'Testing an input field accepting Age from 18 to 60',
      code: `
Requirement: Accept valid integer Age between 18 and 60 inclusive.

Valid Boundary Values to Test:
1. Minimum Boundary:        18 (Valid)
2. Just Above Minimum:      19 (Valid)
3. Nominal Midpoint:        35 (Valid)
4. Just Below Maximum:      59 (Valid)
5. Maximum Boundary:        60 (Valid)

Invalid Boundary Values to Test (Robustness):
6. Just Below Minimum:      17 (Invalid - Should reject!)
7. Just Above Maximum:      61 (Invalid - Should reject!)
      `
    },
    commonInterviewQuestions: [
      {
        question: 'What is Cyclomatic Complexity and how is it calculated from a program control flow graph?',
        answer: 'Cyclomatic Complexity (McCabe metric) measures the number of linearly independent paths through code, indicating program testability and complexity. It is calculated by: V(G) = E - N + 2P, where E is the number of edges, N is the number of nodes, and P is the number of connected components (P = 1 for a single program). Alternatively, V(G) = Number of decision (predicate) nodes + 1.'
      },
      {
        question: 'What is the difference between Alpha Testing and Beta Testing?',
        answer: 'Alpha Testing is conducted at the developer’s site by internal employees or quality assurance teams in a controlled environment before commercial release. Beta Testing is conducted by real end-users at their own operational locations in a real-world, uncontrolled environment to catch edge-case issues before mass rollout.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assuming 100% Statement Coverage guarantees bug-free software.',
        correction: 'Statement coverage merely guarantees each line was executed once; it does NOT test all conditional branches, combinations of logic, or missing requirements.',
        why: 'Code with an unhandled `if` branch can pass 100% statement coverage while failing decision coverage.'
      }
    ],
    quickRevision: [
      'Testing Pyramid: Unit (base) -> Integration -> System -> Acceptance.',
      'Black-box: Equivalence Partitioning & Boundary Value Analysis.',
      'White-box: Statement, Branch coverage, McCabe Cyclomatic complexity (E - N + 2).',
      'Stub: Dummy called function (Top-down); Driver: Dummy calling function (Bottom-up).'
    ],
    practiceQuestions: [
      {
        id: 'se-test-pq1',
        question: 'If a program control flow graph has 14 edges and 10 nodes with 1 connected component, what is its McCabe Cyclomatic Complexity?',
        options: ['4', '5', '6', '12'],
        correctOptionIndex: 2,
        explanation: 'Cyclomatic Complexity formula: V(G) = E - N + 2 = 14 - 10 + 2 = 6.'
      }
    ]
  },

  // ===================== REVISION DAYS 15 & 16 =====================
  'rev-all-synthesis': {
    topicId: 'rev-all-synthesis',
    topicName: 'Comprehensive Cross-Subject Core Revision',
    subjectId: 'operating-systems',
    whatIsIt: 'Intensive cross-disciplinary synthesis integrating Operating Systems, Data Structures, Digital Fundamentals, DBMS, SQL, Java, Python, and Networks into high-yield comparative cheat-sheets.',
    simpleExplanation: 'Day 15 is your master mental workout: connecting the dots between how CPU scheduling links to queues in data structures, how B+ trees in data structures power database indexing, and how TCP packets traverse OS network stacks.',
    technicalExplanation: 'Synthesizes all 9 core BCA/MCA disciplines: 1) OS: Process states, CPU scheduling (SJF is optimal for turnaround time), Banker’s algorithm safe state check, Paging translation (Physical Addr = Frame * PageSize + Offset), Page replacement; 2) DSA: Big-O Asymptotics hierarchy (O(1) < O(log N) < O(N) < O(N log N) < O(N^2) < O(2^N)), Tree traversals (In-order BST = sorted), Graph MSTs (Prim vs Kruskal); 3) Digital: 2’s complement formula, K-Map simplification, Full Adder logic, MUX equations; 4) DBMS & SQL: ACID properties, Normalization (1NF atomic, 2NF no partial, 3NF no transitive, BCNF superkey), Joins, Subqueries; 5) Programming: Java JVM bytecode vs Python dynamic PyObject, OOP polymorphism; 6) Networks: OSI 7-layer vs TCP/IP, CIDR subnet host calculations (2^(32-n) - 2), TCP 3-way handshake.',
    importantDefinitions: [
      { term: 'Asymptotic Hierarchy', definition: 'The fundamental mathematical ordering of algorithmic growth rates: O(1) < O(log N) < O(N) < O(N log N) < O(N^2) < O(2^N) < O(N!).' },
      { term: 'ACID Guarantees', definition: 'Atomicity (all or nothing), Consistency (preserves invariants), Isolation (concurrent serializability), Durability (persisted on disk).' },
      { term: 'BCNF (Boyce-Codd Normal Form)', definition: 'A relational schema where for every non-trivial functional dependency X -> Y, X is strictly a Super Key.' },
      { term: 'TCP 3-Way Handshake', definition: 'The reliable transport connection setup sequence: SYN (Client) -> SYN-ACK (Server) -> ACK (Client).' }
    ],
    keyConcepts: [
      'Universal Formula: Usable IP hosts = 2^(32 - prefix) - 2; Trees with N vertices = N - 1 edges; Undirected graph sum of degrees = 2E.',
      'Optimal algorithms: SJF minimizes average waiting time in CPU scheduling; Optimal page replacement provides theoretical minimum page faults.',
      'Sorting complexities: MergeSort is guaranteed O(N log N) worst-case; QuickSort is O(N log N) average but O(N^2) worst-case.',
      'Difference between 3NF and BCNF: In 3NF, the right-hand side Y can be a prime attribute; in BCNF, the left-hand side X MUST be a superkey without exception.'
    ],
    example: {
      type: 'text',
      title: 'Master Complexity & Formula Matrix',
      explanation: 'High-yield formulas for rapid exam retrieval',
      code: `
================ MASTER EXAM RETRIEVAL CHEAT SHEET ================
1. ALGORITHMIC ASYMPTOTICS:
   - MergeSort: Best/Avg/Worst = O(N log N), Space = O(N)
   - QuickSort: Best/Avg = O(N log N), Worst = O(N^2), Space = O(log N)
   - HeapSort:  Best/Avg/Worst = O(N log N), Space = O(1) (In-place)
   - Binary Search: O(log N), Requires sorted sequence.

2. DIGITAL FUNDAMENTALS FORMULAS:
   - 2's Complement: 1's Comp + 1. Range: -2^(n-1) to +2^(n-1) - 1.
   - Hamming Rule: 2^r >= m + r + 1.
   - Full Adder: Sum = A ^ B ^ Cin, Carry = AB + Cin(A ^ B).

3. NETWORKS & OPERATING SYSTEMS:
   - Usable Hosts in Subnet: 2^(32 - CIDR) - 2.
   - Banker's Algorithm: Need[i][j] = Max[i][j] - Allocation[i][j].
   - Paging: Physical Address = (Frame Number * Page Size) + Offset.
===================================================================
      `
    },
    commonInterviewQuestions: [
      {
        question: 'How do Data Structures and Operating Systems intersect in modern computing systems?',
        answer: 'Every OS core subsystem is built on classical data structures: Process ready queues use Queues or Priority Heaps; Memory management uses Free Lists or Bitmaps; Virtual memory page replacement uses Doubly Linked Lists and Hash Maps (LRU cache); File systems use Inodes and B+ Trees (directory index lookup).'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Memorizing concepts in silos without understanding cross-disciplinary connections.',
        correction: 'Observe how B+ trees solve disk I/O in both Data Structures and DBMS, or how queues govern both CPU scheduling and BFS.',
        why: 'MCA entrance examinations and technical interviews frequently pose cross-subject synthesis questions.'
      }
    ],
    quickRevision: [
      'MergeSort: Guaranteed O(N log N); QuickSort: O(N^2) worst.',
      'SJF gives minimum average waiting time.',
      'BCNF: Every LHS must be a superkey.',
      'CIDR usable hosts = 2^(32 - prefix) - 2.'
    ],
    practiceQuestions: [
      {
        id: 'rev-syn-pq1',
        question: 'Which in-place sorting algorithm guarantees O(N log N) time complexity in both best, average, and worst cases with O(1) auxiliary space?',
        options: ['QuickSort', 'MergeSort', 'HeapSort', 'BubbleSort'],
        correctOptionIndex: 2,
        explanation: 'HeapSort operates in-place with O(1) auxiliary space and guarantees O(N log N) runtime across all cases (best, average, and worst).'
      }
    ]
  },

  'rev-final-mock': {
    topicId: 'rev-final-mock',
    topicName: 'High-Yield Mock Examination & Weak-Spot Eradication',
    subjectId: 'data-structures',
    whatIsIt: 'Final exam rehearsal featuring high-yield multi-disciplinary problem solving, time-pressured scenario analysis, and systematic eradication of common misconceptions.',
    simpleExplanation: 'Day 16 is game day simulation: practicing the highest-probability exam traps, verifying speed and accuracy, and entering your MCA entrance exam with complete confidence and mastery.',
    technicalExplanation: 'Comprehensive review encompassing tricky edge-cases across all 9 subjects: 1) OS: Belady’s anomaly on FIFO page replacement, Banker’s algorithm multi-resource allocation, Semaphores wait (decrement) vs signal (increment); 2) DSA: Worst-case BST deletion, AVL rotations (LL, RR, LR, RL), Disjoint set union by rank with path compression; 3) Digital: Booth’s algorithm negative number handling, K-map don’t care minimization, Johnson counter MOD-2n states; 4) DBMS: Finding Candidate Keys using Functional Dependency closure (Attribute Closure X+); 5) SQL: Correlated subquery evaluation, NULL handling in NOT IN; 6) Java & Python: String constant pool vs new String(), Python mutable default arguments; 7) Networks: Subnetting edge cases (/30, /31, /32), TCP SYN flood defenses; 8) Software Engineering: McCabe cyclomatic complexity calculation.',
    importantDefinitions: [
      { term: 'Attribute Closure (X+)', definition: 'The complete set of all attributes functionally determined by attribute set X under a set of functional dependencies F.' },
      { term: "Belady's Anomaly", definition: 'The paradox where allocating more physical page frames causes more page faults in FIFO replacement.' },
      { term: 'Candidate Key', definition: 'A minimal superkey—a set of attributes that uniquely determines all other attributes in a relation, with no redundant subsets.' },
      { term: 'Time-Budget Strategy', definition: 'Allocating ~60 seconds per multiple choice question and flagging calculation-heavy questions for the second pass.' }
    ],
    keyConcepts: [
      'Finding Candidate Keys: Attributes that never appear on the RHS of any FD MUST be part of every candidate key; calculate their closure first.',
      'Belady’s Anomaly test: Only FIFO and related non-stack algorithms suffer; LRU and Optimal are mathematically exempt.',
      'AVL Rotation triggers: LL -> Right Rotate; RR -> Left Rotate; LR -> Left then Right Rotate; RL -> Right then Left Rotate.',
      'Exam Technique: Eliminate blatantly wrong answers first; verify binary powers of 2 (2^10=1024, 2^16=65536, 2^32=4.29B).'
    ],
    example: {
      type: 'text',
      title: 'Finding Candidate Keys via Attribute Closure',
      explanation: 'Relation R(A, B, C, D, E) with FDs: {A -> BC, CD -> E, B -> D, E -> A}',
      code: `
Step 1: Check attributes absent from RHS:
   RHS contains: BC, E, D, A.
   Notice: None are completely absent! All appear somewhere.

Step 2: Compute closure of A:
   A+ = {A}
   Apply A -> BC:   {A, B, C}
   Apply B -> D:    {A, B, C, D}
   Apply CD -> E:   {A, B, C, D, E} = ALL attributes!
   Therefore: A is a Candidate Key!

Step 3: Can other attributes determine A?
   Since E -> A, compute E+:
   E+ = {E, A} -> since A+ is all attributes, E+ is also ALL attributes!
   Therefore: E is a Candidate Key!

Step 4: Check CD:
   CD -> E -> A -> all.
   Can we reduce CD? Since B -> D, check BC:
   BC+ = {B, C, D, E, A} = All!
   Candidate Keys: {A}, {E}, {BC}, {CD}.
      `
    },
    commonInterviewQuestions: [
      {
        question: 'What is your strategy when solving difficult multiple-choice questions in an MCA entrance exam?',
        answer: '1. First pass: Solve all straightforward conceptual and definition questions immediately (building score and momentum).\n2. Second pass: Tackle algorithmic traces, K-maps, subnetting math, and attribute closures with scratch calculations.\n3. Technique: Use process of elimination to discard extreme or contradictory options, verify boundary conditions, and double-check arithmetic.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Spending 5+ minutes stuck on a single difficult calculation during a timed exam.',
        correction: 'Flag the question, move on to bank easy points, and return during the final review phase.',
        why: 'All questions typically carry equal marks; getting stuck damages score potential.'
      }
    ],
    quickRevision: [
      'Attribute closure X+ determines candidate keys.',
      'FIFO can exhibit Belady’s anomaly; LRU never does.',
      'AVL balance factor must be in {-1, 0, +1}.',
      'Stay calm, trust your preparation, read questions carefully!'
    ],
    practiceQuestions: [
      {
        id: 'rev-mock-pq1',
        question: 'Given relation R(A, B, C) with functional dependency A -> B, what is the candidate key of relation R?',
        options: ['A', 'AC', 'AB', 'C'],
        correctOptionIndex: 1,
        explanation: 'Attribute C never appears on the right-hand side of any dependency, so C must be in every candidate key. Computing (AC)+: (AC)+ = {A, C, B} = All attributes. Therefore, AC is the unique candidate key.'
      }
    ]
  }
};
