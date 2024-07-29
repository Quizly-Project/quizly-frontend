```
quizly-frontend
├─ .eslintrc.cjs
├─ .gitignore
├─ .prettierrc
├─ README.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ Character
│  ├─ Environment
│  ├─ Image
│  ├─ Sounds
│  └─ fonts
├─ src
│  ├─ App.jsx
│  ├─ api
│  │  └─ axios.js
│  ├─ assets
│  ├─ components
│  │  ├─ 3d
│  │  │  ├─ CoordinateHelpers.jsx
│  │  │  ├─ Effects
│  │  │  │  ├─ CryingEmojiConfetti.jsx
│  │  │  │  ├─ Emoji.jsx
│  │  │  │  ├─ QuizResultEffects.jsx
│  │  │  │  └─ ShimmeringText.jsx
│  │  │  ├─ Environment
│  │  │  │  ├─ Arrow3D.jsx
│  │  │  │  ├─ BasicSpotLights.jsx
│  │  │  │  ├─ Beachside.jsx
│  │  │  │  ├─ Blackboard.jsx
│  │  │  │  ├─ Bridge.jsx
│  │  │  │  ├─ BrokenBridge.jsx
│  │  │  │  ├─ BrokenLand.jsx
│  │  │  │  ├─ ExplosionConfetti.jsx
│  │  │  │  ├─ Floor.jsx
│  │  │  │  ├─ IslandMaterial.jsx
│  │  │  │  ├─ Land.jsx
│  │  │  │  ├─ Lights.jsx
│  │  │  │  ├─ LineConfetti.jsx
│  │  │  │  ├─ OEffects.jsx
│  │  │  │  ├─ OXText.jsx
│  │  │  │  ├─ SpotLights.jsx
│  │  │  │  ├─ StaticMaterials.jsx
│  │  │  │  ├─ Wall.jsx
│  │  │  │  ├─ XEffects.jsx
│  │  │  │  └─ YesNo.jsx
│  │  │  ├─ Mesh
│  │  │  │  ├─ Character.jsx
│  │  │  │  ├─ CharacterController.jsx
│  │  │  │  └─ OtherCharacterController.jsx
│  │  │  └─ PerfMonitor.jsx
│  │  ├─ Game
│  │  │  ├─ CommonUI.jsx
│  │  │  ├─ CorrectAnswererSpotLights
│  │  │  │  └─ CorrectAnswererSpotLights.jsx
│  │  │  ├─ FinalTopThreeParticipants
│  │  │  │  ├─ FinalTopThreeParticipants.jsx
│  │  │  │  └─ FinalTopThreeParticipants.module.css
│  │  │  ├─ GameContainer
│  │  │  │  ├─ GameContainer.jsx
│  │  │  │  └─ GameContainer.module.css
│  │  │  ├─ GameUserInterface
│  │  │  │  ├─ GameUserInterface.jsx
│  │  │  │  └─ GameUserInterface.module.css
│  │  │  ├─ GoldenbellUI
│  │  │  │  ├─ GoldenbellUI.jsx
│  │  │  │  └─ GoldenbellUI.module.css
│  │  │  ├─ LiveKit
│  │  │  │  ├─ LiveKit.tsx
│  │  │  │  ├─ VideoAudio.tsx
│  │  │  │  └─ components
│  │  │  │     ├─ AudioComponent.tsx
│  │  │  │     ├─ VideoComponent.css
│  │  │  │     └─ VideoComponent.tsx
│  │  │  ├─ MyCameraOtherVoice
│  │  │  │  └─ MyCameraOtherVoice.tsx
│  │  │  ├─ NickNameInput
│  │  │  │  ├─ NickNameInput.jsx
│  │  │  │  └─ NickNameInput.module.css
│  │  │  ├─ ParticipantList
│  │  │  │  ├─ ParticipantList.jsx
│  │  │  │  └─ ParticipantList.module.css
│  │  │  ├─ Question.jsx
│  │  │  ├─ QuizProgress
│  │  │  │  ├─ QuizProgress.jsx
│  │  │  │  └─ QuizProgress.module.css
│  │  │  ├─ QuizQuestionCompletion
│  │  │  │  ├─ QuizQuestionCompletion.jsx
│  │  │  │  └─ QuizQuestionCompletion.module.css
│  │  │  ├─ QuizResultCameraAnimation.jsx
│  │  │  ├─ QuizResultText.jsx
│  │  │  ├─ QuizStartButton.jsx
│  │  │  ├─ ReadyMessage
│  │  │  │  ├─ ReadyMessage.jsx
│  │  │  │  └─ ReadyMessage.module.css
│  │  │  ├─ RemoteVideoDisplay
│  │  │  │  └─ RemoteVideoDisplay.tsx
│  │  │  ├─ RoundEndMessage
│  │  │  │  ├─ RoundEndMessage.jsx
│  │  │  │  └─ RoundEndMessage.module.css
│  │  │  ├─ StudentResult
│  │  │  │  ├─ StudentResult.jsx
│  │  │  │  └─ StudentResult.module.css
│  │  │  ├─ StudentUI.jsx
│  │  │  ├─ TeacherUI
│  │  │  │  ├─ TeacherUI.jsx
│  │  │  │  └─ TeacherUI.module.css
│  │  │  ├─ Timer
│  │  │  │  ├─ Timer.jsx
│  │  │  │  └─ Timer.module.css
│  │  │  └─ TopThreeParticipants
│  │  │     ├─ TopThreeParticipants.jsx
│  │  │     └─ TopThreeParticipants.module.css
│  │  └─ common
│  │     ├─ Button
│  │     │  ├─ Button.jsx
│  │     │  └─ Button.module.css
│  │     ├─ ChatComponent
│  │     │  ├─ ChatComponent.jsx
│  │     │  └─ ChatComponent.module.css
│  │     ├─ InputField
│  │     │  ├─ InputField.jsx
│  │     │  └─ InputField.module.css
│  │     ├─ MultipleChoiceForm
│  │     │  ├─ MultipleChoiceForm.jsx
│  │     │  └─ MultipleChoiceForm.module.css
│  │     ├─ MultipleChoiceQuizForm
│  │     │  ├─ MultipleChoiceQuizForm.jsx
│  │     │  └─ MultipleChoiceQuizForm.module.css
│  │     ├─ MyQuiz
│  │     │  ├─ MyQuiz.jsx
│  │     │  └─ MyQuiz.module.css
│  │     ├─ OXQuizForm
│  │     │  ├─ OXQuizForm.jsx
│  │     │  └─ OXQuizForm.module.css
│  │     ├─ QuizCard
│  │     │  ├─ QuizCard.jsx
│  │     │  └─ QuizCard.module.css
│  │     ├─ QuizDetailModal
│  │     │  ├─ QuizDetailModal.jsx
│  │     │  └─ QuizDetailModal.module.css
│  │     ├─ QuizList
│  │     │  ├─ QuizList.jsx
│  │     │  └─ QuizList.module.css
│  │     ├─ RoomCodeModal
│  │     │  ├─ RoomCodeModal.jsx
│  │     │  └─ RoomCodeModal.module.css
│  │     ├─ SearchBar
│  │     │  ├─ SearchBar.jsx
│  │     │  └─ SearchBar.module.css
│  │     ├─ Select
│  │     │  ├─ Select.jsx
│  │     │  └─ Select.module.css
│  │     ├─ SelectCreateQuiz
│  │     │  ├─ SelectCreateQuiz.jsx
│  │     │  └─ SelectCreateQuiz.module.css
│  │     ├─ ShortAnswerForm
│  │     │  ├─ ShortAnswerForm.jsx
│  │     │  └─ ShortAnswerForm.module.css
│  │     ├─ Sidebar
│  │     │  ├─ Sidebar.jsx
│  │     │  └─ Sidebar.module.css
│  │     └─ Text
│  │        ├─ Text.jsx
│  │        └─ Text.module.css
│  ├─ hooks
│  │  ├─ useBackgroundMusic.js
│  │  ├─ useResultCameraMovement.js
│  │  └─ useTimer.js
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ CreateQuiz
│  │  │  ├─ CreateQuiz.jsx
│  │  │  └─ CreateQuiz.module.css
│  │  ├─ Dashboard
│  │  │  ├─ Dashboard.jsx
│  │  │  └─ Dashboard.module.css
│  │  ├─ Game.jsx
│  │  ├─ Landing
│  │  │  ├─ Landing.jsx
│  │  │  └─ Landing.module.css
│  │  ├─ MainPage
│  │  │  ├─ MainPage.jsx
│  │  │  └─ MainPage.module.css
│  │  ├─ QuizResult.jsx
│  │  ├─ SignIn.jsx
│  │  ├─ SignUp.jsx
│  │  ├─ TeacherQuizDashboard
│  │  │  ├─ TeacherQuizDashboard.jsx
│  │  │  └─ TeacherQuizDashboard.module.css
│  │  └─ Test.jsx
│  ├─ store
│  │  ├─ audioStore.js
│  │  ├─ authStore.js
│  │  ├─ inputFocusedStore.js
│  │  ├─ liveKitStore.ts
│  │  ├─ quizRoomStore.js
│  │  └─ socketStore.js
│  ├─ styles
│  │  ├─ App.css
│  │  ├─ QuizResult.css
│  │  ├─ game.css
│  │  └─ index.css
│  └─ utils
│     ├─ socketHandlers.js
│     └─ spawnLocations.js
├─ tsconfig.json
└─ vite.config.js

```
