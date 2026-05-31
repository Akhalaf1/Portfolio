// terminal.js
const bootScreen = document.getElementById('boot-screen');
const bootBar = document.getElementById('boot-bar');
const bootPct = document.getElementById('boot-pct');
const terminalWrapper = document.getElementById('terminal-wrapper');
const output = document.getElementById('output');
const cmdInput = document.getElementById('cmd-input');
const cmdListBtns = document.querySelectorAll('.cmd-btn');
const clockEl = document.getElementById('clock');
const cursorBlock = document.querySelector('.cursor-block');

// Ascii Art for boot screen
const bootAscii = `
   _____ ___.        .___    .__  .__          
  /  _  \\_ |__    __| _/__  |  | |  | _____   
 /  /_\\  \\| __ \\  / __ ||  | |  | |  | \\__  \\  
/    |    \\ \\_\\ \\/ /_/ ||  |_|  |_|  |__/ __ \\_
\\____|__  /___  /\\____ | \\____/____/____(____  /
        \\/    \\/      \\/                     \\/ 
System Initialization...
`;

const welcomeBanner = `
<div class="welcome-ascii">
    ___ ___.        .___    .__  .__          
   /   |   \\__  ___|   |____|  | |  | _____   
  /    ~    \\  \\/  /   \\__  \\  | |  | \\__  \\  
  \\    Y    />    <|   |/ __ \\|  |_|  |__/ __ \\_
   \\___|_  /__/\\_ \\___(____  /____/____(____  /
         \\/      \\/        \\/               \\/ 
</div>
<div class="welcome-sub">Welcome to Abdulla Khalaf's Interactive Portfolio v1.0.0</div>
<br>
<div class="out-dim">Type <span class="out-cyan">help</span> or use the sidebar to navigate.</div>
<div class="out-blank"></div>
`;

// File System / Data
const fileSystem = {
  'about.txt': {
    type: 'file',
    content: `
<span class="out-cyan">NAME:</span> Abdulla Khalaf
<span class="out-cyan">MAJOR:</span> Computer Science
<span class="out-cyan">UNIVERSITY:</span> American University of Bahrain (AUBH)

<span class="out-green">SUMMARY:</span>
The moment I configured my first device just to learn how it functioned, I knew that technology was not only a topic that I had to learn and study, it was a language that I was familiar with. Computers and information technology has always been a passion of mine.

I don't just want to use technology; I want to know it inside and out, make things with it, and help develop it.
`
  },
  'journey.log': {
    type: 'file',
    content: `
<span class="out-amber">01/01/2020</span> - <span class="out-text">Configured my first device just to learn how it functioned.</span>
<span class="out-amber">15/06/2021</span> - <span class="out-text">Set up my own file server (hardware & software) without instruction.</span>
<span class="out-amber">22/11/2022</span> - <span class="out-text">Installed a home media player, explored various Linux distros.</span>
<span class="out-amber">10/09/2023</span> - <span class="out-text">Enrolled at Nasser Center for Science and Technology (NCST).</span>
<span class="out-amber">Present</span>    - <span class="out-text">Enrolling in the Computer Science program at AUBH.</span>
`
  },
  'interests.json': {
    type: 'file',
    content: `
{
  "<span class="out-cyan">academic</span>": [
    "Software Engineering",
    "Networking",
    "Cyber Security",
    "Systems Architecture"
  ],
  "<span class="out-cyan">hobbies</span>": [
    "Chess",
    "Sudoku",
    "Logic Puzzles",
    "System Optimization"
  ]
}
`
  },
  'goals.txt': {
    type: 'file',
    content: `
<span class="out-header">FUTURE AMBITIONS</span>
My long term vision is to be at the forefront and at the crossroads of innovation and infrastructure.

<span class="out-green">1.</span> Develop intelligent, secure networks and software solutions.
<span class="out-green">2.</span> Impact lives through technology.
<span class="out-green">3.</span> Contribute to the development of the local tech sector in Bahrain.
<span class="out-green">4.</span> Play a role in the next generation of tech innovators in the region.
`
  },
  'achievements.txt': {
    type: 'file',
    content: `
<div class="out-achievement">
  <div class="out-ach-icon">*</div>
  <div class="out-ach-body">
    <div class="out-ach-title">NCST Graduation Project</div>
    <div class="out-ach-desc">My graduation project was selected to be showcased on Bahrain TV, highlighting its innovation and technical excellence.</div>
  </div>
</div>
<div class="out-achievement">
  <div class="out-ach-icon">*</div>
  <div class="out-ach-body">
    <div class="out-ach-title">NCST Foundation</div>
    <div class="out-ach-desc">Studying IT gave me a solid foundation, introducing me to foundational concepts that many peers are just now seeing.</div>
  </div>
</div>
<div class="out-achievement">
  <div class="out-ach-icon">*</div>
  <div class="out-ach-body">
    <div class="out-ach-title">Self-Directed Engineering</div>
    <div class="out-ach-desc">Successfully built a local file server and home media player from scratch, optimizing Linux distros entirely autonomously.</div>
  </div>
</div>
`
  },
  'contributions.txt': {
    type: 'file',
    content: `
<span class="out-header">COMMUNITY & VALUES</span>

My learning experiences have been a testament to my patience, independent thinking, and the drive to take an idea and make it work.

<span class="out-cyan">University Contribution:</span>
I come to AUBH with more than academic preparation—I come with curiosity, a history of self-directed learning, and a motivation to do more than the minimum. I want to be challenged, work collaboratively, and elevate the community around me.
`
  },
  'scholarship.txt': {
    type: 'file',
    content: `
<span class="out-header">WHY THIS SCHOLARSHIP?</span>

This scholarship represents more than financial support; it is an investment in my potential to impact Bahrain's technological landscape.

<span class="out-quote">"I want to be challenged, I want to work with people, and I want to get better."</span>

By supporting my journey at AUBH, this scholarship will allow me to focus entirely on academic excellence, deep technical exploration, and community building, accelerating my path to becoming a leader in the region's tech sector.
`
  },
  'contact.md': {
    type: 'file',
    content: `
# Contact Info
- **Email:** <a href="mailto:abdullakhalaf2008@gmail.com" class="out-cyan">abdullakhalaf2008@gmail.com</a>
- **Phone:** <a href="tel:+97334642266" class="out-cyan">+973 34642266</a>
- **GitHub:** <a href="https://github.com/Akhalaf1" target="_blank" class="out-cyan">github.com/Akhalaf1</a>
`
  },
  'projects': {
    type: 'dir',
    content: ['bandify.txt', 'file-server', 'home-media', 'linux-ricing']
  },
  'projects/bandify.txt': {
    type: 'file',
    content: `
<span class="out-header">PROJECT: BANDIFY</span>

An advanced IELTS preparation system powered by <span class="out-amber">AWS</span> (Amazon Web Services).

<span class="out-cyan">Key Features:</span>
- <span class="out-green">Serverless Architecture:</span> Utilizing AWS Lambda and API Gateway for scalable backends.
- <span class="out-green">AI Integration:</span> Automated essay grading and summarization using LLMs on Amazon Bedrock.
- <span class="out-green">Interactive Exams:</span> Full-length Reading and Listening practice tests with automated scoring.
`
  },
  'skills': {
    type: 'dir',
    content: ['programming.txt', 'networking.txt', 'problem_solving.txt']
  }
};

// Boot Sequence
let bootProgress = 0;
const bootInterval = setInterval(() => {
  bootProgress += Math.random() * 15;
  if (bootProgress >= 100) bootProgress = 100;
  
  bootBar.setAttribute('data-pct', bootProgress + '%');
  bootPct.innerText = Math.floor(bootProgress) + '%';
  
  if (bootProgress === 100) {
    clearInterval(bootInterval);
    setTimeout(finishBoot, 500);
  }
}, 150);

function finishBoot() {
  bootScreen.classList.add('fade-out');
  terminalWrapper.classList.remove('hidden');
  terminalWrapper.classList.add('visible');
  printHTML(welcomeBanner);
  cmdInput.focus();
}

document.getElementById('ascii-art').innerText = bootAscii;

// Terminal Logic
const commands = {
  help: () => {
    printText("Available commands:");
    const cmds = ["whoami", "ls [dir]", "cat [file]", "clear", "help", "date"];
    cmds.forEach(c => printHTML(`<span class="out-cyan" style="display:inline-block;width:100px;">${c}</span> - Execute command`));
  },
  whoami: () => printText("abdulla_khalaf - Aspiring Systems Architect"),
  clear: () => { output.innerHTML = ''; },
  date: () => printText(new Date().toString()),
  ls: (args) => {
    let target = args[0] || '.';
    if (target === '.') {
      const files = Object.keys(fileSystem).map(f => {
        let isDir = fileSystem[f].type === 'dir';
        return `<span class="${isDir ? 'out-amber' : 'out-cyan'}">${f}</span>`;
      }).join('  ');
      printHTML(files);
    } else {
      let dir = target.replace(/\/+$/, '');
      if (fileSystem[dir] && fileSystem[dir].type === 'dir') {
        printHTML(fileSystem[dir].content.map(f => `<span class="out-cyan">${f}</span>`).join('  '));
      } else {
        printText(`ls: cannot access '${target}': No such file or directory`);
      }
    }
  },
  cat: (args) => {
    if (!args[0]) {
      printText("cat: missing file operand");
      return;
    }
    let file = args[0];
    if (fileSystem[file]) {
      if (fileSystem[file].type === 'dir') {
        printText(`cat: ${file}: Is a directory`);
      } else {
        printHTML(fileSystem[file].content);
      }
    } else {
      printText(`cat: ${file}: No such file or directory`);
    }
  }
};

function executeCommand(cmdStr) {
  if (!cmdStr.trim()) return;
  printHTML(`<div class="out-cmd">${cmdStr}</div>`);
  
  const parts = cmdStr.trim().split(' ');
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);
  
  if (commands[cmd]) {
    commands[cmd](args);
  } else {
    printText(`bash: ${cmd}: command not found. Type 'help' for available commands.`);
  }
  
  output.scrollTop = output.scrollHeight;
}

function printText(text) {
  const div = document.createElement('div');
  div.className = 'out-line out-text';
  div.innerText = text;
  output.appendChild(div);
}

function printHTML(html) {
  const div = document.createElement('div');
  div.className = 'out-line';
  div.innerHTML = html;
  output.appendChild(div);
}

cmdInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const val = cmdInput.value;
    cmdInput.value = '';
    executeCommand(val);
  }
});

// Update cursor position visually (simulated)
cmdInput.addEventListener('input', () => {
  // Just let CSS handle blinking, input handles text.
});

// Sidebar Buttons
cmdListBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const cmd = btn.getAttribute('data-cmd');
    executeCommand(cmd);
    cmdInput.focus();
    
    // Highlight button
    cmdListBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Clock
setInterval(() => {
  const now = new Date();
  clockEl.innerText = now.toLocaleTimeString();
}, 1000);

// Focus terminal on click anywhere
document.addEventListener('click', (e) => {
  if (!e.target.closest('#sidebar') && !e.target.closest('.win-btns')) {
    cmdInput.focus();
  }
});
