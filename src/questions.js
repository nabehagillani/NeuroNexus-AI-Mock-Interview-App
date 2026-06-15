// 📑 NEURONEXUS Core Field Taxonomy Blueprint
export const INTERVIEW_DISCIPPINES = {
  computing: {
    title: "Tech & Computing",
    subfields: {
      ai: "Artificial Intelligence (AI)",
      ml: "Machine Learning (ML)",
      ds: "Data Science",
      se: "Software Engineering",
      cyber: "Cybersecurity",
      networks: "Computer Networks",
      db: "Database Systems",
      os: "Operating Systems",
      graphics: "Computer Graphics",
      hci: "Human-Computer Interaction (HCI)",
      theory: "Theoretical Computer Science",
      cloud: "Cloud Computing",
      dev: "Mobile & Web Development"
    }
  },
  medical: {
    title: "Medical & Health Sciences",
    subfields: {
      med: "Clinical Medicine (Gen Physician, Cardio, Neuro)",
      surg: "Surgery (General Surgery, Orthopedics)",
      peds: "Pediatrics (Children's Health)",
      gyn: "Gynecology & Obstetrics (Women's Health)",
      rad: "Radiology (X-rays, MRI, CT scans)",
      path: "Pathology (Lab Tests & Diagnostics)",
      pharma: "Pharmacy",
      nursing: "Nursing",
      physio: "Physiotherapy",
      mlt: "Medical Laboratory Technology"
    }
  },
  electrical: {
    title: "Electrical Engineering",
    subfields: {
      power: "Power Engineering",
      electronics: "Electronics Engineering",
      control: "Control Systems & Automation",
      telecom: "Communication Engineering",
      dsp: "Signal Processing",
      micro: "Microelectronics & Semiconductors",
      embedded: "Embedded Systems & IoT",
      machines: "Electrical Machines & Transformers",
      instrument: "Instrumentation Engineering",
      powerelec: "Power Electronics Devices",
      renewable: "Renewable Energy Systems",
      highvolt: "High Voltage Engineering"
    }
  },
  chemical: {
    title: "Chemical Engineering",
    subfields: {
      mass: "Mass Transfer Processes",
      heat: "Heat Transfer Systems",
      fluid: "Fluid Mechanics",
      thermo: "Thermodynamics",
      cre: "Chemical Reaction Engineering",
      control_ch: "Process Control Automation",
      design_ch: "Process Design & Equipment",
      plant: "Plant Design & Operations",
      materials: "Materials Science",
      transport: "Transport Phenomena",
      ind_chem: "Industrial Chemistry",
      sep: "Separation Processes",
      biochem: "Biochemical Engineering",
      enviro: "Environmental Engineering",
      safety: "Safety & Hazard Management"
    }
  },
  bba: {
    title: "Business Administration (BBA)",
    subfields: {
      accounting: "Accounting & Financial Records",
      finance: "Finance & Money Investments",
      marketing: "Marketing, Branding & Ads",
      hrm: "Human Resource Management",
      management: "Management & Leadership",
      economics: "Economics & Market Behavior",
      law: "Business Law & Legal Rules",
      comm: "Business Communication",
      entrep: "Entrepreneurship & Startups",
      operations: "Operations & Supply Chain",
      stats: "Statistics & Business Math",
      is: "Information Systems Technology"
    }
  }
};

// 📂 Dynamic Target Mock Assessment Data Repository
export const INTERVIEW_CATEGORIES = {
  // --- TECH & COMPUTING STATIC SEEDS ---
  ai: [
    {
      id: "ai-1",
      question: "What is the difference between Strong AI (General) and Weak AI (Narrow)? Which one dominates the current industry landscape?",
      tip: "Explain how narrow AI solves specific rule-bound applications while general AI matches human intelligence domains.",
      keywords: ["narrow ai", "general ai", "superintelligence", "nlp"]
    }
  ],
  ml: [
    {
      id: "ml-1",
      question: "Explain the architectural difference between a deep neural network (DNN) and a convolutional neural network (CNN). In what scenarios would you deploy a CNN?",
      tip: "Focus your explanation on local spatial feature extraction, weight sharing parameters, and image data structure alignment.",
      keywords: ["spatial", "convolutional", "weight sharing", "pooling", "kernel"]
    }
  ],
  se: [
    {
      id: "se-1",
      question: "What are the primary structural trade-offs when transitioning a legacy monolithic application layout into a containerized microservices architecture?",
      tip: "Discuss operational network overhead, database decentralization, and horizontal deployment velocity.",
      keywords: ["monolith", "decoupling", "latency", "docker", "api gateway", "bounded context"]
    }
  ],

  // --- MEDICAL FIELD STATIC SEEDS ---
  med: [
    {
      id: "med-1",
      question: "What clinical indicators differentiate Type 1 Diabetic Ketoacidosis (DKA) from Hyperosmolar Hyperglycemic State (HHS) during emergency room triage?",
      tip: "Focus on blood pH levels, the presence of serum ketones, anion gap configurations, and absolute plasma glucose thresholds.",
      keywords: ["ketones", "acidosis", "ph", "anion gap", "hyperglycemia"]
    }
  ],
  surg: [
    {
      id: "surg-1",
      question: "Outline the critical sterilization and safety verification steps demanded by the WHO Surgical Safety Checklist before primary skin incision begins.",
      tip: "Detail the mandatory 'Time Out' protocol, verification of patient identity, operative site marking, and antibiotic administration timing.",
      keywords: ["time out", "sterility", "antibiotic prophylaxis", "site marking", "incision"]
    }
  ],

  // --- ELECTRICAL ENGINEERING STATIC SEEDS ---
  power: [
    {
      id: "pow-1",
      question: "What causes transient overvoltage conditions in regional electrical transmission lines, and how do surge arresters protect substation transformers?",
      tip: "Discuss lightning strikes or inductive load switching actions, explaining non-linear varistor impedance shunting behavior to ground.",
      keywords: ["transient", "surge arrester", "varistor", "impedance", "substation"]
    }
  ],

  // --- CHEMICAL ENGINEERING STATIC SEEDS ---
  mass: [
    {
      id: "mass-1",
      question: "Explain the physical significance of the Peclet number and how it scales inside industrial multi-stage fractionation towers.",
      tip: "Connect the dimensionless parameter with the ratio of advective transport rates to diffusive transport rates.",
      keywords: ["peclet number", "advection", "diffusion", "mass transfer"]
    }
  ],

  // --- BBA STATIC SEEDS ---
  accounting: [
    {
      id: "acc-1",
      question: "Explain the Double-Entry Accounting equation structure and clarify how unearned corporate revenue is treated on the Balance Sheet vs the Income Statement.",
      tip: "Remember that unearned revenue represents an obligation to perform service pipelines. Detail its transition from liability profiles to earned revenue.",
      keywords: ["assets", "liabilities", "equity", "deferred revenue", "balance sheet", "accrual"]
    }
  ]
};