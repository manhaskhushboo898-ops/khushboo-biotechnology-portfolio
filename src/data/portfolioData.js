/**
 * Khushboo Manhas — Academic Portfolio Data
 * First-Year B.Tech Biotechnology Undergraduate
 * Lovely Professional University (Class of 2030)
 * 
 * NOTE: Academic profile presented with complete honesty.
 * Future years and research explorations are explicitly framed as goals and learning priorities.
 */

export const STUDENT_PROFILE = {
  name: "Khushboo Manhas",
  givenName: "Khushboo",
  surname: "Manhas",
  title: "Undergraduate in Biotechnology",
  degree: "B.Tech Biotechnology (2026–2030)",
  university: "Lovely Professional University",
  universityShort: "LPU",
  location: "Punjab, India",
  campusCoordinates: "31.2530° N, 75.7042° E",
  classOf: "Class of 2030",
  expectedGraduation: 2030,
  currentYearLabel: "First-Year Student (2026–2027)",
  currentStatus: "Undergraduate Student · Year 1 of 4",
  email: "manhaskhushi898@gmail.com",
  linkedIn: "https://www.linkedin.com/in/khushboo-manhas-8974b7431/",
  tagline: "First-year Biotechnology undergraduate investigating the molecular architecture of life — from DNA replication fidelity and microbial ecology to computational sequence analysis.",
  heroSummary: "Standing at the threshold of biological science, exploring how genetics, microbiology, and computational inquiry converge to address healthcare, agricultural resilience, and planetary health.",
  academicHonestyNote: "Academic profile presented honestly. Current coursework encompasses Year 1 foundational sciences. Laboratory techniques and research directions represent active learning priorities and prospective undergraduate goals."
};

export const SCIENTIFIC_INTERESTS = [
  {
    id: "genetics-molbio",
    category: "Pillar 01",
    title: "Genetics & Molecular Biology",
    subtitle: "Information storage, chromosomal dynamics, and transcriptional regulation",
    overview: "Investigating the fundamental mechanisms governing genetic inheritance, DNA replication precision, and gene expression at the molecular scale.",
    lineworkIcon: "dna",
    keyConcepts: [
      { name: "Central Dogma", desc: "DNA transcription to messenger RNA followed by ribosomal translation into functional polypeptides." },
      { name: "Replication Fidelity", desc: "Semiconservative replication, 5'→3' polymerase kinetics, and enzymatic proofreading." },
      { name: "Epigenetic Regulation", desc: "Chromatin remodeling, histone acetylation, and DNA methylation patterns." },
      { name: "Recombinant DNA Tools", desc: "Restriction endonucleases, plasmid cloning vectors, and recombinant expression systems." }
    ],
    curiosityQuestion: "How do molecular proofreading enzymes maintain an error rate lower than 1 in 10⁹ base pairs during human genome replication?",
    badge: "Core Discipline"
  },
  {
    id: "microbiology",
    category: "Pillar 02",
    title: "Microbiology & Microbial Ecology",
    subtitle: "Bacterial physiology, metabolic versatility, and microbial interactions",
    overview: "Exploring the staggering diversity and biochemical plasticity of microorganisms, from extremophilic adaptations to environmental nutrient cycling.",
    lineworkIcon: "microbe",
    keyConcepts: [
      { name: "Bacterial Kinetics", desc: "Sigmoidal growth dynamics across lag, exponential (log), stationary, and decline phases." },
      { name: "Cell Wall Architecture", desc: "Peptidoglycan layering differentiating Gram-positive and Gram-negative envelope structures." },
      { name: "Aseptic Technique", desc: "Pure culture isolation, serial dilution, selective media, and sterile bench protocols." },
      { name: "Metabolic Diversity", desc: "Aerobic respiration, fermentative pathways, and lithotrophic electron transport chains." }
    ],
    curiosityQuestion: "What regulatory cascades trigger the transition from active exponential division to persistent stationary phase in closed environments?",
    badge: "Core Discipline"
  },
  {
    id: "bioinformatics",
    category: "Pillar 03",
    title: "Bioinformatics & Computational Biology",
    subtitle: "In silico sequence analysis, biological databases, and structural modeling",
    overview: "Connecting computational reasoning with biological data to decode nucleotide sequences, predict macromolecular structures, and query genomic repositories.",
    lineworkIcon: "terminal",
    keyConcepts: [
      { name: "Sequence Alignment", desc: "Pairwise algorithms (Needleman-Wunsch global, Smith-Waterman local) and heuristic BLAST querying." },
      { name: "Biological Repositories", desc: "NCBI GenBank, UniProt protein knowledgebase, and the RCSB Protein Data Bank (PDB)." },
      { name: "In Silico Translation", desc: "Open reading frame (ORF) detection, codon bias analysis, and genetic code deciphering." },
      { name: "Molecular Visualization", desc: "Spatial rendering of secondary structures: alpha-helices, beta-sheets, and active catalytic pockets." }
    ],
    curiosityQuestion: "How can computational heuristic algorithms accelerate the detection of functional motifs across gigabase-scale genomic sequences?",
    badge: "Core Discipline"
  }
];

export const LEARNING_ROADMAP = [
  {
    year: "Year 1",
    academicPeriod: "2026 – 2027",
    status: "CURRENT FOCUS",
    phaseTitle: "Foundations & Laboratory Discipline",
    tagline: "Establishing core scientific literacy, chemical principles, and academic rigor",
    description: "Immersed in first-year foundational coursework at Lovely Professional University. Focusing on mastering the fundamental principles of cell biology, general chemistry, mathematics for life sciences, and developing scientific writing proficiency.",
    focusAreas: [
      "Cellular biology and ultrastructure of prokaryotic vs eukaryotic systems",
      "Principles of physical, organic, and analytical biochemistry",
      "Foundational mathematics, biostatistics, and data interpretation",
      "Good Laboratory Practices (GLP), chemical safety, and precision measurement",
      "Scientific communication, literature reading, and structured documentation"
    ],
    milestones: [
      { title: "Academic Immersion", desc: "Successfully adjusting to undergraduate STEM rigor at LPU.", completed: true },
      { title: "Literature Comprehension", desc: "Reading and annotating peer-reviewed biological papers.", completed: true },
      { title: "Laboratory Foundations", desc: "Standard operating procedures, pipette calibration, and metric calculations.", completed: false }
    ]
  },
  {
    year: "Year 2",
    academicPeriod: "2027 – 2028",
    status: "INTENDED GOAL",
    phaseTitle: "Molecular Mechanisms & Analytical Methods",
    tagline: "Advancing from cellular descriptions to molecular machinery and analytical protocols",
    description: "Prospective second-year roadmap focused on molecular genetics, microbiology laboratory techniques, enzymology, and introductory computational programming for biological datasets.",
    focusAreas: [
      "Molecular genetics: DNA replication, transcription, translation, and mutational mechanisms",
      "Microbiology laboratory: culture preparation, Gram staining, and microbial identification",
      "Enzyme kinetics, metabolic pathways, and bioenergetics",
      "Introductory programming (Python/R) for biological data and sequence parsing",
      "Spectrophotometry, chromatography basics, and electrophoresis theory"
    ],
    milestones: [
      { title: "Molecular Assays", desc: "Prospective mastery of gel electrophoresis and aseptic culture.", completed: false },
      { title: "Computational Literacy", desc: "Writing scripts to process FASTA files and codon counts.", completed: false },
      { title: "Peer Study Groups", desc: "Co-leading collaborative journal discussions on emerging biotech.", completed: false }
    ]
  },
  {
    year: "Year 3",
    academicPeriod: "2028 – 2029",
    status: "INTENDED GOAL",
    phaseTitle: "Genomics, Bioprocessing & In Silico Analysis",
    tagline: "Integrating computational pipelines with bioprocess engineering and genomic technologies",
    description: "Prospective third-year curriculum prioritizing large-scale biological systems: high-throughput genomics, bioprocess optimization, structural bioinformatics, and recombinant protein expression.",
    focusAreas: [
      "Functional genomics, transcriptomics, and next-generation sequencing workflows",
      "Bioprocess engineering: bioreactor design, mass transfer, and fermentation kinetics",
      "Structural bioinformatics: homology modeling and ligand-receptor docking fundamentals",
      "Immunology and hybridoma technology fundamentals",
      "Scientific research methodology and experimental design"
    ],
    milestones: [
      { title: "Bioinformatics Pipeline", desc: "Constructing multi-step computational sequence analysis workflows.", completed: false },
      { title: "Bioreactor Simulation", desc: "Modeling batch and fed-batch fermentation kinetics.", completed: false },
      { title: "Undergraduate Seminar", desc: "Delivering an oral presentation on modern molecular diagnostics.", completed: false }
    ]
  },
  {
    year: "Year 4",
    academicPeriod: "2029 – 2030",
    status: "INTENDED GOAL",
    phaseTitle: "Capstone Synthesis & Graduate Preparation",
    tagline: "Synthesizing theoretical knowledge, laboratory skills, and computational tools for future research",
    description: "Prospective senior year culminating in an undergraduate capstone dissertation, synthesis of multi-year academic learning, and preparation for postgraduate research programs.",
    focusAreas: [
      "Undergraduate capstone dissertation in genetics, microbiology, or bioinformatics",
      "Advanced computational modeling of biological networks and gene circuits",
      "Ethical, legal, and social implications (ELSI) of genetic technologies",
      "Preparation for national and international graduate entrance assessments",
      "Scientific publication drafting and scholarly presentation"
    ],
    milestones: [
      { title: "Senior Dissertation", desc: "Completing a thorough undergraduate capstone study.", completed: false },
      { title: "Scientific Portfolio", desc: "Publishing a comprehensive archive of undergraduate investigations.", completed: false },
      { title: "Graduation (2030)", desc: "Graduating with B.Tech Biotechnology (2026–2030) from Lovely Professional University.", completed: false }
    ]
  }
];

export const FOUNDATIONAL_SKILLS = [
  {
    group: "Academic & Communication",
    skills: [
      {
        name: "Scientific Writing",
        description: "Drafting structured lab notes, literature summaries, and academic essays with disciplined scientific terminology.",
        status: "Active Practice"
      },
      {
        name: "Oral Presentation & Communication",
        description: "Articulating complex biological concepts clearly in academic group discussions and student seminars.",
        status: "Active Practice"
      },
      {
        name: "Collaborative Teamwork",
        description: "Coordinating peer review groups, sharing experimental responsibilities, and fostering constructive academic dialogue.",
        status: "Active Practice"
      }
    ]
  },
  {
    group: "Digital & Productivity Tools",
    skills: [
      {
        name: "Microsoft Word",
        description: "Formatting academic manuscripts, scientific laboratory reports, table formatting, and APA/Vancouver citation referencing.",
        status: "Proficient"
      },
      {
        name: "Microsoft PowerPoint",
        description: "Designing uncluttered, legible scientific slide decks, conceptual process flowcharts, and academic presentations.",
        status: "Proficient"
      },
      {
        name: "Digital Research & Literature Navigation",
        description: "Querying Google Scholar, PubMed, and institutional library databases to source peer-reviewed scientific literature.",
        status: "Active Practice"
      }
    ]
  },
  {
    group: "Foundational Biotechnology Knowledge",
    skills: [
      {
        name: "Cell Biology & Biomolecules",
        description: "Understanding cell compartmentalization, membrane transport, and the biochemical properties of proteins, lipids, and nucleic acids.",
        status: "Year 1 Coursework"
      },
      {
        name: "DNA Architecture & Central Dogma",
        description: "Grasping Watson-Crick antiparallel double-helix topology, nucleotide base pairing rules, and the mechanics of protein translation.",
        status: "Year 1 Coursework"
      },
      {
        name: "Laboratory Safety & GLP Concepts",
        description: "Theoretical understanding of biohazard classifications, autoclave sterilization principles, and chemical hygiene protocols.",
        status: "Year 1 Coursework"
      }
    ]
  }
];

export const RESEARCH_INTERESTS = [
  {
    title: "DNA Repair Dynamics & Genomic Stability",
    field: "Molecular Genetics",
    description: "The enzymatic surveillance systems (base excision repair, nucleotide excision repair, and mismatch repair) that safeguard cellular genomes against mutagenic insults.",
    inquiry: "How do subtle conformational changes in repair enzymes discriminate between cognate and mismatched nucleotide bases?"
  },
  {
    title: "Microbial Adaptations to Extreme Environments",
    field: "Environmental Microbiology",
    description: "The biochemical mechanisms employed by psychrophiles, thermophiles, and halophiles to preserve membrane fluidity and catalytic enzyme integrity.",
    inquiry: "What structural motifs grant hyperthermophilic enzymes stability at temperatures exceeding 90°C?"
  },
  {
    title: "Algorithmic In Silico Sequence & Structure Analysis",
    field: "Computational Biology",
    description: "The computational pipelines used to align divergent genomic sequences, detect evolutionary conservation, and model macromolecular interactions.",
    inquiry: "How can deep sequence alignments enhance our predictive understanding of conserved functional motifs?"
  },
  {
    title: "Microbial Biosensors & Sustainable Bioproducts",
    field: "Applied Biotechnology",
    description: "Harnessing bacterial metabolic pathways for environmental remediation, heavy metal sensing, and renewable biochemical synthesis.",
    inquiry: "Can targeted bacterial gene expression act as a rapid, cost-effective bio-indicator for water contaminants?"
  }
];

// Complete Universal Genetic Code (Codon Table)
export const CODON_TABLE = {
  // Phenylalanine & Leucine
  UUU: { aa: "Phe", name: "Phenylalanine", letter: "F", type: "Hydrophobic (Aromatic)" },
  UUC: { aa: "Phe", name: "Phenylalanine", letter: "F", type: "Hydrophobic (Aromatic)" },
  UUA: { aa: "Leu", name: "Leucine", letter: "L", type: "Hydrophobic (Aliphatic)" },
  UUG: { aa: "Leu", name: "Leucine", letter: "L", type: "Hydrophobic (Aliphatic)" },

  // Serine
  UCU: { aa: "Ser", name: "Serine", letter: "S", type: "Polar (Uncharged)" },
  UCC: { aa: "Ser", name: "Serine", letter: "S", type: "Polar (Uncharged)" },
  UCA: { aa: "Ser", name: "Serine", letter: "S", type: "Polar (Uncharged)" },
  UCG: { aa: "Ser", name: "Serine", letter: "S", type: "Polar (Uncharged)" },

  // Tyrosine & Stop
  UAU: { aa: "Tyr", name: "Tyrosine", letter: "Y", type: "Polar (Aromatic)" },
  UAC: { aa: "Tyr", name: "Tyrosine", letter: "Y", type: "Polar (Aromatic)" },
  UAA: { aa: "STOP", name: "Ochre Stop", letter: "*", type: "Termination Signal" },
  UAG: { aa: "STOP", name: "Amber Stop", letter: "*", type: "Termination Signal" },

  // Cysteine, Tryptophan & Stop
  UGU: { aa: "Cys", name: "Cysteine", letter: "C", type: "Special (Disulfide-forming)" },
  UGC: { aa: "Cys", name: "Cysteine", letter: "C", type: "Special (Disulfide-forming)" },
  UGA: { aa: "STOP", name: "Opal Stop", letter: "*", type: "Termination Signal" },
  UGG: { aa: "Trp", name: "Tryptophan", letter: "W", type: "Hydrophobic (Aromatic)" },

  // Leucine
  CUU: { aa: "Leu", name: "Leucine", letter: "L", type: "Hydrophobic (Aliphatic)" },
  CUC: { aa: "Leu", name: "Leucine", letter: "L", type: "Hydrophobic (Aliphatic)" },
  CUA: { aa: "Leu", name: "Leucine", letter: "L", type: "Hydrophobic (Aliphatic)" },
  CUG: { aa: "Leu", name: "Leucine", letter: "L", type: "Hydrophobic (Aliphatic)" },

  // Proline
  CCU: { aa: "Pro", name: "Proline", letter: "P", type: "Special (Cyclic / Conformational)" },
  CCC: { aa: "Pro", name: "Proline", letter: "P", type: "Special (Cyclic / Conformational)" },
  CCA: { aa: "Pro", name: "Proline", letter: "P", type: "Special (Cyclic / Conformational)" },
  CCG: { aa: "Pro", name: "Proline", letter: "P", type: "Special (Cyclic / Conformational)" },

  // Histidine & Glutamine
  CAU: { aa: "His", name: "Histidine", letter: "H", type: "Positively Charged (Basic)" },
  CAC: { aa: "His", name: "Histidine", letter: "H", type: "Positively Charged (Basic)" },
  CAA: { aa: "Gln", name: "Glutamine", letter: "Q", type: "Polar (Uncharged)" },
  CAG: { aa: "Gln", name: "Glutamine", letter: "Q", type: "Polar (Uncharged)" },

  // Arginine
  CGU: { aa: "Arg", name: "Arginine", letter: "R", type: "Positively Charged (Basic)" },
  CGC: { aa: "Arg", name: "Arginine", letter: "R", type: "Positively Charged (Basic)" },
  CGA: { aa: "Arg", name: "Arginine", letter: "R", type: "Positively Charged (Basic)" },
  CGG: { aa: "Arg", name: "Arginine", letter: "R", type: "Positively Charged (Basic)" },

  // Isoleucine & Methionine (Start)
  AUU: { aa: "Ile", name: "Isoleucine", letter: "I", type: "Hydrophobic (Aliphatic)" },
  AUC: { aa: "Ile", name: "Isoleucine", letter: "I", type: "Hydrophobic (Aliphatic)" },
  AUA: { aa: "Ile", name: "Isoleucine", letter: "I", type: "Hydrophobic (Aliphatic)" },
  AUG: { aa: "Met", name: "Methionine (Start)", letter: "M", type: "Start Codon / Hydrophobic" },

  // Threonine
  ACU: { aa: "Thr", name: "Threonine", letter: "T", type: "Polar (Uncharged)" },
  ACC: { aa: "Thr", name: "Threonine", letter: "T", type: "Polar (Uncharged)" },
  ACA: { aa: "Thr", name: "Threonine", letter: "T", type: "Polar (Uncharged)" },
  ACG: { aa: "Thr", name: "Threonine", letter: "T", type: "Polar (Uncharged)" },

  // Asparagine & Lysine
  AAU: { aa: "Asn", name: "Asparagine", letter: "N", type: "Polar (Uncharged)" },
  AAC: { aa: "Asn", name: "Asparagine", letter: "N", type: "Polar (Uncharged)" },
  AAA: { aa: "Lys", name: "Lysine", letter: "K", type: "Positively Charged (Basic)" },
  AAG: { aa: "Lys", name: "Lysine", letter: "K", type: "Positively Charged (Basic)" },

  // Serine & Arginine
  AGU: { aa: "Ser", name: "Serine", letter: "S", type: "Polar (Uncharged)" },
  AGC: { aa: "Ser", name: "Serine", letter: "S", type: "Polar (Uncharged)" },
  AGA: { aa: "Arg", name: "Arginine", letter: "R", type: "Positively Charged (Basic)" },
  AGG: { aa: "Arg", name: "Arginine", letter: "R", type: "Positively Charged (Basic)" },

  // Valine
  GUU: { aa: "Val", name: "Valine", letter: "V", type: "Hydrophobic (Aliphatic)" },
  GUC: { aa: "Val", name: "Valine", letter: "V", type: "Hydrophobic (Aliphatic)" },
  GUA: { aa: "Val", name: "Valine", letter: "V", type: "Hydrophobic (Aliphatic)" },
  GUG: { aa: "Val", name: "Valine", letter: "V", type: "Hydrophobic (Aliphatic)" },

  // Alanine
  GCU: { aa: "Ala", name: "Alanine", letter: "A", type: "Hydrophobic (Aliphatic)" },
  GCC: { aa: "Ala", name: "Alanine", letter: "A", type: "Hydrophobic (Aliphatic)" },
  GCA: { aa: "Ala", name: "Alanine", letter: "A", type: "Hydrophobic (Aliphatic)" },
  GCG: { aa: "Ala", name: "Alanine", letter: "A", type: "Hydrophobic (Aliphatic)" },

  // Aspartate & Glutamate
  GAU: { aa: "Asp", name: "Aspartate", letter: "D", type: "Negatively Charged (Acidic)" },
  GAC: { aa: "Asp", name: "Aspartate", letter: "D", type: "Negatively Charged (Acidic)" },
  GAA: { aa: "Glu", name: "Glutamate", letter: "E", type: "Negatively Charged (Acidic)" },
  GAG: { aa: "Glu", name: "Glutamate", letter: "E", type: "Negatively Charged (Acidic)" },

  // Glycine
  GGU: { aa: "Gly", name: "Glycine", letter: "G", type: "Special (Flexible, Achiral)" },
  GGC: { aa: "Gly", name: "Glycine", letter: "G", type: "Special (Flexible, Achiral)" },
  GGA: { aa: "Gly", name: "Glycine", letter: "G", type: "Special (Flexible, Achiral)" },
  GGG: { aa: "Gly", name: "Glycine", letter: "G", type: "Special (Flexible, Achiral)" }
};

export const CODON_PRESETS = [
  {
    label: "GFP Chromophore Initiation",
    description: "Start motif of Aequorea victoria Green Fluorescent Protein (GFP)",
    sequence: "ATGAGTAAAGGAGAAGAACTTTTCACTGGAGTTGTCCCAATTCTTGTTGAATTAGATGGTGATGTTAATGGGCAC"
  },
  {
    label: "Human Insulin B-chain snippet",
    description: "Early coding region of human preproinsulin signal peptide",
    sequence: "ATGGCCCTGTGGATGCGCCTCCTGCCCCTGCTGGCGCTGCTGGCCCTCTGGGGACCTGACCCAGCC"
  },
  {
    label: "Start & Early Termination (Stop Demo)",
    description: "A short synthetic sequence illustrating Start codon (AUG) and early Stop codon (UAA)",
    sequence: "ATGGGCTACCGCTAATTC"
  },
  {
    label: "Incomplete Codon (Trailer Demo)",
    description: "Sequence with 8 nucleotides demonstrating incomplete trailing bases",
    sequence: "ATGGCCGA"
  }
];

export const DNA_BASE_INFO = {
  A: {
    name: "Adenine",
    type: "Purine",
    complement: "T",
    bonds: 2,
    rings: "Bicyclic (Fused 6-membered & 5-membered rings)",
    formula: "C₅H₅N₅",
    color: "#C28251", // Terracotta
    desc: "Pairs with Thymine via 2 hydrogen bonds. Binds to T at positions N1 and C6-amino."
  },
  T: {
    name: "Thymine",
    type: "Pyrimidine",
    complement: "A",
    bonds: 2,
    rings: "Monocyclic (6-membered heterocyclic pyrimidine ring)",
    formula: "C₅H₆N₂O₂",
    color: "#B89758", // Brass
    desc: "Pairs with Adenine via 2 hydrogen bonds. Contains a 5-methyl group distinguishing it from Uracil."
  },
  G: {
    name: "Guanine",
    type: "Purine",
    complement: "C",
    bonds: 3,
    rings: "Bicyclic (Fused 6-membered & 5-membered rings)",
    formula: "C₅H₅N₅O",
    color: "#4E7259", // Sage
    desc: "Pairs with Cytosine via 3 hydrogen bonds. Higher GC content elevates thermal denaturation stability (Tm)."
  },
  C: {
    name: "Cytosine",
    type: "Pyrimidine",
    complement: "G",
    bonds: 3,
    rings: "Monocyclic (6-membered heterocyclic pyrimidine ring)",
    formula: "C₄H₅N₃O",
    color: "#1B4332", // Deep moss
    desc: "Pairs with Guanine via 3 hydrogen bonds. Susceptible to spontaneous deamination to Uracil."
  }
};

export const DNA_SEQUENCE_PRESETS = [
  { label: "TATA Box Promoter Consensus", seq: "TATAAAAGGG" },
  { label: "Human Telomeric Repeat", seq: "TTAGGGTTAGGG" },
  { label: "EcoRI Restriction Cleavage Site", seq: "GAATTCGAATTC" },
  { label: "GC-Rich Regulatory Island", seq: "GCGCGCGCAT" }
];
