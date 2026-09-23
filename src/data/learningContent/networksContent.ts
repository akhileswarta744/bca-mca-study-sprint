import { TopicLearningContent } from '../../types';

export const NETWORKS_LEARNING_CONTENT: Record<string, TopicLearningContent> = {
  'cn-models': {
    topicId: 'cn-models',
    topicName: 'Network Models: OSI 7-Layer vs TCP/IP 4-Layer',
    subjectId: 'computer-networks',
    whatIsIt: 'The Open Systems Interconnection (OSI) 7-layer model is a conceptual reference framework developed by ISO to standardize telecommunication functions, while the TCP/IP 4-layer model is the practical implementation suite powering the global Internet.',
    simpleExplanation: 'Imagine sending an international postal package. You write a letter (Application), translate it into English if needed (Presentation), organize conversation turn-taking (Session), pack it into numbered parcel boxes (Transport), write destination country and address (Network), hand it to a mail truck on local roads (Data Link), and move truck wheels over physical asphalt (Physical layer).',
    technicalExplanation: 'OSI 7 Layers (Top to Bottom): 7. Application (Network access for software: HTTP, FTP, SMTP), 6. Presentation (Data translation, encryption, compression: SSL/TLS, JPEG, ASCII), 5. Session (Session establishment, checkpoints, dialog control), 4. Transport (End-to-end delivery, port multiplexing, segmentation, flow/error control: TCP, UDP), 3. Network (Logical addressing, packet routing, best path determination: IP, ICMP, OSPF), 2. Data Link (Node-to-node framing, physical MAC addressing, switch bridging: Ethernet, ARP), 1. Physical (Transmission of raw unstructured bits over physical medium: cables, radio waves). TCP/IP collapses these into 4 layers: Application (Layers 7, 6, 5), Transport (Layer 4), Internet (Layer 3), and Network Access / Host-to-Network (Layers 2, 1).',
    importantDefinitions: [
      { term: 'PDU (Protocol Data Unit)', definition: 'The name given to a discrete chunk of data at each protocol layer: Application = Data/Message, Transport = Segment, Network = Packet, Data Link = Frame, Physical = Bits.' },
      { term: 'Encapsulation', definition: 'The process where each descending layer wraps the payload from the layer above with its own header (and trailer at Layer 2).' },
      { term: 'MAC vs IP Address', definition: 'MAC address is a 48-bit burned-in physical hardware address for local LAN hop delivery; IP address is a 32-bit (IPv4) or 128-bit (IPv6) logical address for global routing across networks.' },
    ],
    keyConcepts: [
      'Layer Mnemonic: "All People Seem To Need Data Processing" (Application -> Physical) or "Please Do Not Throw Sausage Pizza Away" (Physical -> Application).',
      'Port Numbers: Located at Transport Layer (Layer 4) to distinguish specific target application processes on the host.',
      'Devices per Layer: Hub / Repeater = Layer 1; Switch / Bridge = Layer 2; Router = Layer 3; Gateway / Next-Gen Firewall = Layers 4–7.',
    ],
    example: {
      type: 'diagram',
      title: 'OSI 7-Layer vs TCP/IP 4-Layer Architecture with PDUs',
      explanation: 'Mapping OSI layers to TCP/IP and their respective protocol data units.',
      diagramAscii: `
  OSI 7-LAYER MODEL           TCP/IP 4-LAYER SUITE        PDU & PROTOCOLS
+-----------------------+   +-----------------------+   +--------------------+
| 7. Application Layer  |   |                       |   | Data / Message     |
+-----------------------+   |                       |   | (HTTP, DNS, SSH)   |
| 6. Presentation Layer |-->| 4. Application Layer  |   +--------------------+
+-----------------------+   |                       |   | Encryption, SSL/TLS|
| 5. Session Layer      |   |                       |   | RPC, NetBIOS       |
+-----------------------+   +-----------------------+   +--------------------+
| 4. Transport Layer    |-->| 3. Transport Layer    |   | Segment (TCP/UDP)  |
+-----------------------+   +-----------------------+   +--------------------+
| 3. Network Layer      |-->| 2. Internet Layer     |   | Packet (IP, ICMP)  |
+-----------------------+   +-----------------------+   +--------------------+
| 2. Data Link Layer    |   | 1. Network Access /   |   | Frame (MAC, Eth)   |
+-----------------------+-->|    Host-to-Network    |   +--------------------+
| 1. Physical Layer     |   |    Layer              |   | Bits (Cables, RF)  |
+-----------------------+   +-----------------------+   +--------------------+
      `,
    },
    commonInterviewQuestions: [
      {
        question: 'What happens during data encapsulation and decapsulation as a web request travels across the network?',
        answer: 'During Encapsulation (sender transmitting): User data generated at the Application layer is passed down. Transport layer appends a TCP header (source and destination ports) creating a Segment. Network layer appends an IP header (source and destination IPs) creating a Packet. Data Link layer appends a MAC header and CRC error-checking trailer creating a Frame. Physical layer converts the frame into raw bit pulses over the medium. Decapsulation is the inverse process occurring at the receiver: each layer strips its corresponding header, validates it, and passes the payload upward.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Thinking that a network switch routes packets using IP addresses.',
        correction: 'A standard Layer 2 switch operates at the Data Link layer, using physical MAC addresses to forward frames. Routers operate at Layer 3 using IP addresses.',
        why: 'Switches build MAC address tables; routers build IP routing tables.',
      },
    ],
    quickRevision: [
      'OSI: 7 layers; TCP/IP: 4 layers.',
      'PDUs: App=Data, Transport=Segment, Network=Packet, Data Link=Frame, Physical=Bits.',
      'Transport = Port addresses (TCP/UDP); Network = IP addresses; Data Link = MAC addresses.',
      'Routers = Layer 3; Switches = Layer 2; Hubs = Layer 1.',
    ],
    practiceQuestions: [
      {
        id: 'cn-mod-q1',
        question: 'At which OSI layer does packet routing and logical IP addressing take place?',
        options: ['Data Link Layer', 'Transport Layer', 'Network Layer', 'Session Layer'],
        correctOptionIndex: 2,
        explanation: 'The Network layer (Layer 3) handles logical IP addressing, path determination, and packet routing across networks.',
      },
    ],
  },

  'cn-tcp-udp': {
    topicId: 'cn-tcp-udp',
    topicName: 'Transport Layer: TCP (3-Way Handshake) vs UDP',
    subjectId: 'computer-networks',
    whatIsIt: 'The Transport Layer provides process-to-process communication using two primary protocols: Transmission Control Protocol (TCP), a connection-oriented reliable protocol, and User Datagram Protocol (UDP), a lightweight connectionless protocol.',
    simpleExplanation: 'TCP is like a certified courier delivery with signature confirmation: you verify the receiver is home before sending, track each envelope, and resend any package lost in transit. UDP is like shouting through a megaphone across a stadium or sending a postcard: fast and low-effort, but there is no receipt confirming if anyone actually heard you.',
    technicalExplanation: 'TCP (RFC 793): Connection-oriented, establishes connection using the 3-Way Handshake (SYN → SYN-ACK → ACK). Provides guaranteed in-order delivery via sequence numbers and cumulative acknowledgments (ACKs), sliding window flow control, and congestion control (Slow Start, Congestion Avoidance, Fast Retransmit). Header size: 20–60 bytes. UDP (RFC 768): Connectionless, sends independent datagrams without handshakes, no acknowledgments, no retransmissions, and no ordering guarantees. Minimal 8-byte fixed header size, making it ideal for real-time video streaming, DNS lookups, and gaming.',
    importantDefinitions: [
      { term: '3-Way Handshake', definition: 'The TCP connection establishment protocol: 1. Client sends SYN (synchronize seq=x), 2. Server responds with SYN-ACK (seq=y, ack=x+1), 3. Client replies with ACK (ack=y+1).' },
      { term: 'Flow Control', definition: 'Mechanism (Sliding Window) ensuring a fast transmitting sender does not overwhelm a slow receiving host with more data than its buffer can hold.' },
      { term: 'Congestion Control', definition: 'Network-wide mechanism (Slow Start, AIMD) preventing senders from overloading the intermediate routers and links of the Internet.' },
    ],
    keyConcepts: [
      'TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK.',
      'TCP 4-Way Teardown: FIN -> ACK -> FIN -> ACK (or piggybacked).',
      'TCP features: Reliable, Ordered, Byte-stream, Flow-controlled (Window size), Congestion-controlled.',
      'UDP features: Unreliable, Unordered, Message-oriented (preserves datagram boundaries), Low latency, 8-byte header.',
      'Protocols using TCP: HTTP/HTTPS (Web), SMTP (Email), SSH (Remote), FTP (File transfer).',
      'Protocols using UDP: DNS (queries), DHCP, VoIP, Online multiplayer gaming, Live video streaming.',
    ],
    example: {
      type: 'diagram',
      title: 'TCP 3-Way Handshake Flow Diagram',
      explanation: 'Chronological message exchange establishing a reliable TCP connection.',
      diagramAscii: `
    CLIENT                                             SERVER
      |                                                   |
      | -------- 1. SYN (seq = 100) --------------------> | (Server listens on port)
      |                                                   |
      | <------- 2. SYN-ACK (seq = 300, ack = 101) ------ |
      |                                                   |
      | -------- 3. ACK (seq = 101, ack = 301) ---------> |
      |                                                   |
[ESTABLISHED]                                       [ESTABLISHED]
      |                                                   |
      | <====== Bi-directional Data Transfer Begins =====>|
      `,
    },
    commonInterviewQuestions: [
      {
        question: 'Why does TCP require a 3-way handshake to establish a connection instead of just 2 messages?',
        answer: 'A 2-way handshake (SYN followed by ACK) is vulnerable to old duplicate connection requests. If an old SYN packet delayed in the network arrives at the server after the client has closed the session, a 2-way handshake would cause the server to allocate resources and assume a connection is active, while the client has no knowledge of it. The 3rd ACK from the client confirms to the server that the client is indeed active and acknowledges the server’s specific initial sequence number.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Claiming UDP has no checksum or error checking.',
        correction: 'UDP DOES include a 16-bit checksum in its 8-byte header to detect corrupted packets. However, if a checksum mismatch occurs, UDP simply DROPS the damaged packet without asking for a retransmission.',
        why: 'Error detection is present in UDP, but error recovery/retransmission is absent.',
      },
    ],
    quickRevision: [
      'TCP: Connection-oriented, reliable, 3-way handshake, 20-60 byte header.',
      'UDP: Connectionless, unreliable, low-latency, fixed 8-byte header.',
      'Handshake: SYN -> SYN-ACK -> ACK.',
      'TCP used for web, files, email; UDP used for DNS, VoIP, streaming.',
    ],
    practiceQuestions: [
      {
        id: 'cn-tcp-q1',
        question: 'What is the minimum header size of a TCP segment and a UDP datagram respectively?',
        options: ['20 bytes and 8 bytes', '16 bytes and 4 bytes', '32 bytes and 16 bytes', '40 bytes and 20 bytes'],
        correctOptionIndex: 0,
        explanation: 'A standard TCP header has a minimum size of 20 bytes (without options), whereas a UDP header is always a fixed 8 bytes.',
      },
    ],
  },
};
