/**
 * seedFirestore.mjs
 * Seeds mock user data into Firestore for KaalPatra demo purposes.
 *
 * Run with:
 *   node seedFirestore.mjs
 *
 * Requires: firebase-admin SDK + a service account key.
 * Install once: npm install firebase-admin --save-dev
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// ─── Load service account ─────────────────────────────────────────────────────
// Download from Firebase Console → Project Settings → Service Accounts → Generate new private key
// Save the JSON as serviceAccountKey.json in the project root (already in .gitignore)
let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'));
} catch {
  console.error('\n❌  serviceAccountKey.json not found.');
  console.error('   Download it from Firebase Console → Project Settings → Service Accounts\n');
  process.exit(1);
}

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// ─── Mock users ────────────────────────────────────────────────────────────────
const today = new Date();
const daysAgo = (n) => new Date(today.getTime() - n * 86400000).toISOString();
const daysFromNow = (n) => new Date(today.getTime() + n * 86400000).toISOString();

const mockUsers = [
  {
    uid: 'mock_user_001',
    displayName: 'Priya S.',
    integrityScore: 92,
    streak: 14,
    totalKept: 11,
    totalFailed: 1,
    weeklyCheckInRate: 100,
    commitments: [
      {
        goal: 'Complete my final year project report',
        sacrifice: 'No Netflix until submission',
        deadline: daysFromNow(18),
        status: 'locked',
        failurePenalty: 'Buy coffee for the whole group',
        successReward: 'Weekend trip to Manali',
        progressLogs: [
          { date: daysAgo(6), log: 'Finished literature review section.' },
          { date: daysAgo(5), log: 'Drafted methodology chapter.' },
          { date: daysAgo(4), log: 'Data collection complete.' },
          { date: daysAgo(3), log: 'Started analysis.' },
          { date: daysAgo(2), log: 'Results section 70% done.' },
          { date: daysAgo(1), log: 'Proofread chapters 1–3.' },
          { date: daysAgo(0), log: 'Submitted draft to guide.' },
        ],
        createdAt: daysAgo(8),
      },
      {
        goal: 'Run 5km every morning for a month',
        sacrifice: 'No late nights (sleep by 10:30pm)',
        deadline: daysFromNow(22),
        status: 'locked',
        failurePenalty: 'Donate ₹500 to charity',
        successReward: 'Buy new running shoes',
        progressLogs: [
          { date: daysAgo(7), log: 'Day 1 – 5km in 34 mins.' },
          { date: daysAgo(6), log: 'Day 2 – 5km in 33 mins.' },
          { date: daysAgo(5), log: 'Day 3 – legs sore but pushed through.' },
          { date: daysAgo(4), log: 'Day 4 – 5km in 31 mins. PB!' },
          { date: daysAgo(3), log: 'Day 5 – easy run, recovery pace.' },
          { date: daysAgo(2), log: 'Day 6 – 5.5km, went a bit extra.' },
          { date: daysAgo(1), log: 'Day 7 – solid 5km. One week done!' },
        ],
        createdAt: daysAgo(9),
      },
      {
        goal: 'Read 1 technical book per month',
        sacrifice: 'No social media after 9pm',
        deadline: daysAgo(2),
        status: 'success',
        failurePenalty: 'No gaming for 2 weeks',
        successReward: 'Buy next book immediately',
        progressLogs: [
          { date: daysAgo(20), log: 'Started "Clean Code" by Robert Martin.' },
          { date: daysAgo(15), log: 'Halfway through. Taking notes.' },
          { date: daysAgo(10), log: 'Finished. Applied 3 patterns in project.' },
        ],
        createdAt: daysAgo(32),
      },
    ],
  },
  {
    uid: 'mock_user_002',
    displayName: 'Rahul M.',
    integrityScore: 75,
    streak: 7,
    totalKept: 6,
    totalFailed: 2,
    weeklyCheckInRate: 85,
    commitments: [
      {
        goal: 'Build and launch a side project (expense tracker)',
        sacrifice: 'No video games on weekdays',
        deadline: daysFromNow(30),
        status: 'locked',
        failurePenalty: 'Pay ₹1000 to a friend',
        successReward: 'Post about it on LinkedIn',
        progressLogs: [
          { date: daysAgo(7), log: 'Set up React + Firebase project.' },
          { date: daysAgo(5), log: 'Auth flow working.' },
          { date: daysAgo(3), log: 'CRUD for expenses done.' },
          { date: daysAgo(1), log: 'Charts integrated with Recharts.' },
        ],
        createdAt: daysAgo(10),
      },
      {
        goal: 'Learn Spanish to A2 level',
        sacrifice: 'Skip one episode of anime per day and study instead',
        deadline: daysFromNow(60),
        status: 'locked',
        failurePenalty: 'No anime for a month',
        successReward: 'Subscribe to Spanish Netflix content',
        progressLogs: [
          { date: daysAgo(6), log: 'Completed Duolingo streak day 1.' },
          { date: daysAgo(5), log: 'Basics of greetings done.' },
          { date: daysAgo(4), log: 'Numbers and colors learned.' },
          { date: daysAgo(3), log: 'Started food vocabulary.' },
          { date: daysAgo(2), log: '30-min YouTube lesson on present tense.' },
          { date: daysAgo(1), log: 'Had first beginner conversation with AI.' },
        ],
        createdAt: daysAgo(8),
      },
      {
        goal: 'Complete DSA sheet (150 problems)',
        sacrifice: 'No social media until daily problem solved',
        deadline: daysAgo(5),
        status: 'failed',
        failurePenalty: 'Do extra 50 problems',
        successReward: 'Buy premium LeetCode subscription',
        progressLogs: [
          { date: daysAgo(40), log: 'Started arrays section.' },
          { date: daysAgo(30), log: '50 problems done.' },
          { date: daysAgo(20), log: 'Stuck on trees.' },
        ],
        createdAt: daysAgo(90),
      },
      {
        goal: 'Meditate 10 minutes every day for 30 days',
        sacrifice: 'No phone for first 30 minutes after waking up',
        deadline: daysAgo(10),
        status: 'success',
        failurePenalty: 'Wake up 1 hour earlier for a week',
        successReward: 'Buy a proper meditation cushion',
        progressLogs: [
          { date: daysAgo(40), log: 'Day 1: 10 minutes guided meditation.' },
          { date: daysAgo(25), log: '15 days in. Noticing less anxiety.' },
          { date: daysAgo(12), log: 'Day 30 complete!' },
        ],
        createdAt: daysAgo(45),
      },
    ],
  },
  {
    uid: 'mock_user_003',
    displayName: 'Ananya K.',
    integrityScore: 100,
    streak: 21,
    totalKept: 5,
    totalFailed: 0,
    weeklyCheckInRate: 100,
    commitments: [
      {
        goal: 'Write and publish 4 blog posts this month',
        sacrifice: 'No binge-watching on weekdays',
        deadline: daysFromNow(12),
        status: 'locked',
        failurePenalty: 'Write 2 extra posts next month',
        successReward: 'Apply for monetisation',
        progressLogs: [
          { date: daysAgo(14), log: 'Post 1 published: "Why I quit Instagram for 30 days".' },
          { date: daysAgo(10), log: 'Post 2 published: "Morning routine that actually works".' },
          { date: daysAgo(6), log: 'Post 3 draft completed.' },
          { date: daysAgo(3), log: 'Post 3 edited and published!' },
          { date: daysAgo(1), log: 'Post 4 outline drafted.' },
        ],
        createdAt: daysAgo(16),
      },
      {
        goal: 'Prepare for UPSC Prelims — 6 hours daily',
        sacrifice: 'No outings except Sunday',
        deadline: daysFromNow(45),
        status: 'locked',
        failurePenalty: 'Study extra 2 hours on weekends for a month',
        successReward: 'Short trip to Shimla with family',
        progressLogs: [
          { date: daysAgo(21), log: 'History ancient India complete.' },
          { date: daysAgo(18), log: 'Medieval India done. 200 MCQs solved.' },
          { date: daysAgo(15), log: 'Modern India in progress.' },
          { date: daysAgo(12), log: 'Polity chapter 1–5 done.' },
          { date: daysAgo(9), log: 'Geography physical done.' },
          { date: daysAgo(6), log: 'Economy basics — budget concepts.' },
          { date: daysAgo(3), log: 'Environment & ecology started.' },
          { date: daysAgo(1), log: 'Full mock test: 78/100. Improving.' },
        ],
        createdAt: daysAgo(22),
      },
      {
        goal: 'Complete online graphic design course',
        sacrifice: 'Skip lunch outings — eat at desk',
        deadline: daysAgo(15),
        status: 'success',
        failurePenalty: 'Refund the course fee from pocket money',
        successReward: 'Apply for a freelance project',
        progressLogs: [
          { date: daysAgo(45), log: 'Module 1: Typography basics done.' },
          { date: daysAgo(38), log: 'Module 2: Color theory complete.' },
          { date: daysAgo(28), log: 'Module 3: Logo design project submitted.' },
          { date: daysAgo(18), log: 'Final project submitted and graded 94/100!' },
        ],
        createdAt: daysAgo(50),
      },
    ],
  },
  {
    uid: 'mock_user_004',
    displayName: 'Vikram T.',
    integrityScore: 60,
    streak: 3,
    totalKept: 3,
    totalFailed: 2,
    weeklyCheckInRate: 60,
    commitments: [
      {
        goal: 'Lose 5kg before college fest',
        sacrifice: 'No junk food, no sugary drinks',
        deadline: daysFromNow(25),
        status: 'locked',
        failurePenalty: 'Pay for gym membership for the whole group',
        successReward: 'New outfit for the fest',
        progressLogs: [
          { date: daysAgo(5), log: 'Started calorie tracking on MyFitnessPal.' },
          { date: daysAgo(3), log: 'Gym session done. 40 mins cardio.' },
          { date: daysAgo(1), log: 'Down 0.5kg already.' },
        ],
        createdAt: daysAgo(6),
      },
      {
        goal: 'Stop procrastinating — use Pomodoro for all tasks',
        sacrifice: 'Phone locked in drawer during study hours',
        deadline: daysFromNow(14),
        status: 'locked',
        failurePenalty: 'Give up weekend plans',
        successReward: 'Buy a good mechanical keyboard',
        progressLogs: [
          { date: daysAgo(2), log: '4 Pomodoros today. Got through backlog.' },
          { date: daysAgo(1), log: '6 Pomodoros. Most productive day in months.' },
        ],
        createdAt: daysAgo(4),
      },
    ],
  },
  {
    uid: 'mock_user_005',
    displayName: 'Shreya N.',
    integrityScore: 83,
    streak: 9,
    totalKept: 5,
    totalFailed: 1,
    weeklyCheckInRate: 90,
    commitments: [
      {
        goal: 'Finish my internship deliverables 1 week early',
        sacrifice: 'No social media during work hours (9am–6pm)',
        deadline: daysFromNow(7),
        status: 'locked',
        failurePenalty: 'Apologise to the team personally',
        successReward: 'Ask for a letter of recommendation',
        progressLogs: [
          { date: daysAgo(9), log: 'Feature #1 completed and deployed.' },
          { date: daysAgo(7), log: 'Code review done, merged PR.' },
          { date: daysAgo(5), log: 'Feature #2 70% done.' },
          { date: daysAgo(3), log: 'All tests passing.' },
          { date: daysAgo(2), log: 'Documentation written.' },
          { date: daysAgo(1), log: 'Final presentation deck ready.' },
        ],
        createdAt: daysAgo(11),
      },
      {
        goal: 'Practice piano 30 minutes every day',
        sacrifice: 'No phone after 9pm — practice instead',
        deadline: daysFromNow(50),
        status: 'locked',
        failurePenalty: 'Give up piano lessons subscription',
        successReward: 'Record and share one song on Instagram',
        progressLogs: [
          { date: daysAgo(8), log: 'Scales and arpeggios warmup.' },
          { date: daysAgo(7), log: 'Started Für Elise — left hand only.' },
          { date: daysAgo(6), log: 'Both hands slowly.' },
          { date: daysAgo(5), log: 'Getting smoother. 60 BPM.' },
          { date: daysAgo(4), log: '80 BPM with metronome.' },
          { date: daysAgo(3), log: 'First section memorised!' },
          { date: daysAgo(2), log: 'Working on second section.' },
          { date: daysAgo(1), log: 'Played it end to end for the first time.' },
        ],
        createdAt: daysAgo(10),
      },
    ],
  },
];

// ─── Seed function ────────────────────────────────────────────────────────────
async function seed() {
  console.log('\n🌱  Seeding Firestore with mock data...\n');
  const batch = db.batch();

  for (const user of mockUsers) {
    // 1) Write leaderboard entry
    const lbRef = db.collection('leaderboard').doc(user.uid);
    batch.set(lbRef, {
      displayName:    user.displayName,
      integrityScore: user.integrityScore,
      streak:         user.streak,
      totalKept:      user.totalKept,
      totalFailed:    user.totalFailed,
      weeklyCheckInRate: user.weeklyCheckInRate,
      isPublic:       true,
      lastUpdated:    Timestamp.now(),
    });

    // 2) Write each commitment under users/{uid}/commitments
    for (const commitment of user.commitments) {
      const commitRef = db.collection('users').doc(user.uid)
        .collection('commitments').doc();
      batch.set(commitRef, {
        goal:            commitment.goal,
        sacrifice:       commitment.sacrifice,
        deadline:        commitment.deadline,
        status:          commitment.status,
        failurePenalty:  commitment.failurePenalty  || '',
        successReward:   commitment.successReward   || '',
        progressLogs:    commitment.progressLogs    || [],
        createdAt:       commitment.createdAt,
      });
    }

    console.log(`  ✅  ${user.displayName} (${user.uid})`);
  }

  await batch.commit();
  console.log('\n🎉  All mock data seeded successfully!\n');
  console.log('Leaderboard entries:', mockUsers.length);
  console.log('Commitments seeded: ', mockUsers.reduce((s, u) => s + u.commitments.length, 0));
}

seed().catch((err) => {
  console.error('\n❌  Seed failed:', err.message);
  process.exit(1);
});
