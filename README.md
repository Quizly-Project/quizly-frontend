크래프톤 정글 101호 2팀 나만무 프로젝트 프론트엔드 레포지토리입니다.

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
│  └─ Character
│     ├─ Colobus_Animations.glb
│     ├─ Colobus_Animations2.glb
│     ├─ Colobus_Animations3.glb
│     ├─ Colobus_Animations4.glb
│     ├─ Colobus_Animations5.glb
│     ├─ Colobus_Animations6.glb
│     ├─ Colobus_Animations7.glb
│     ├─ Gecko_Animations.glb
│     ├─ Herring_Animations.glb
│     ├─ Inkfish_Animations.glb
│     ├─ Muskrat_Animations.glb
│     ├─ Pudu_Animations.glb
│     ├─ Sparrow_Animations.glb
│     └─ Taipan_Animations.glb
├─ src
│  ├─ App.jsx
│  ├─ api
│  │  └─ axios.js
│  ├─ assets
│  ├─ components
│  │  ├─ 3d
│  │  │  ├─ Environment
│  │  │  │  ├─ Level.jsx
│  │  │  │  ├─ Lights.jsx
│  │  │  │  ├─ OLevel.jsx
│  │  │  │  └─ XLevel.jsx
│  │  │  └─ Mesh
│  │  │     ├─ Character.jsx
│  │  │     ├─ CharacterController.jsx
│  │  │     └─ OtherCharacterController.jsx
│  │  └─ common
│  │     ├─ Button
│  │     │  ├─ Button.jsx
│  │     │  └─ Button.module.css
│  │     ├─ CountTimer
│  │     │  └─ CountTimer.jsx
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
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ CreateQuiz
│  │  │  ├─ CreateQuiz.jsx
│  │  │  └─ CreateQuiz.module.css
│  │  ├─ Dashboard
│  │  │  ├─ Dashboard.jsx
│  │  │  └─ Dashboard.module.css
│  │  ├─ Game.jsx
│  │  ├─ Landing.jsx
│  │  ├─ SignIn.jsx
│  │  ├─ SignUp.jsx
│  │  └─ TeacherQuizDashboard
│  │     ├─ TeacherQuizDashboard.jsx
│  │     └─ TeacherQuizDashboard.module.css
│  ├─ store
│  │  └─ authStore.js
│  ├─ styles
│  │  ├─ App.css
│  │  ├─ game.css
│  │  └─ index.css
│  └─ utils
└─ vite.config.js

```

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
│  │  ├─ Colobus_Animations.glb
│  │  ├─ Colobus_Animations2.glb
│  │  ├─ Colobus_Animations3.glb
│  │  ├─ Colobus_Animations4.glb
│  │  ├─ Colobus_Animations5.glb
│  │  ├─ Colobus_Animations6.glb
│  │  ├─ Colobus_Animations7.glb
│  │  ├─ Gecko_Animations.glb
│  │  ├─ Herring_Animations.glb
│  │  ├─ Inkfish_Animations.glb
│  │  ├─ Muskrat_Animations.glb
│  │  ├─ Pudu_Animations.glb
│  │  ├─ Sparrow_Animations.glb
│  │  ├─ Taipan_Animations.glb
│  │  └─ Turtle_Animations.glb
│  └─ Environment
│     └─ beachside.glb
├─ src
│  ├─ App.jsx
│  ├─ api
│  │  └─ axios.js
│  ├─ assets
│  ├─ components
│  │  ├─ 3d
│  │  │  ├─ Environment
│  │  │  │  ├─ Beachside.jsx
│  │  │  │  ├─ Level.jsx
│  │  │  │  ├─ Lights.jsx
│  │  │  │  ├─ OLevel.jsx
│  │  │  │  └─ XLevel.jsx
│  │  │  └─ Mesh
│  │  │     ├─ Character.jsx
│  │  │     ├─ CharacterController.jsx
│  │  │     └─ OtherCharacterController.jsx
│  │  ├─ Game
│  │  │  ├─ CommonUI.jsx
│  │  │  ├─ GameContainer
│  │  │  │  ├─ GameContainer.jsx
│  │  │  │  └─ GameContainer.module.css
│  │  │  ├─ GameUserInterface
│  │  │  │  ├─ GameUserInterface.jsx
│  │  │  │  └─ GameUserInterface.module.css
│  │  │  ├─ NickNameInput.jsx
│  │  │  ├─ Question.jsx
│  │  │  ├─ QuizResultText.jsx
│  │  │  ├─ QuizStartButton.jsx
│  │  │  ├─ StudentUI.jsx
│  │  │  └─ TeacherUI
│  │  │     ├─ TeacherUI.jsx
│  │  │     └─ TeacherUI.module.css
│  │  └─ common
│  │     ├─ Button
│  │     │  ├─ Button.jsx
│  │     │  └─ Button.module.css
│  │     ├─ CountTimer
│  │     │  └─ CountTimer.jsx
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
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ CreateQuiz
│  │  │  ├─ CreateQuiz.jsx
│  │  │  └─ CreateQuiz.module.css
│  │  ├─ Dashboard
│  │  │  ├─ Dashboard.jsx
│  │  │  └─ Dashboard.module.css
│  │  ├─ Game.jsx
│  │  ├─ Landing.jsx
│  │  ├─ SignIn.jsx
│  │  ├─ SignUp.jsx
│  │  └─ TeacherQuizDashboard
│  │     ├─ TeacherQuizDashboard.jsx
│  │     └─ TeacherQuizDashboard.module.css
│  ├─ store
│  │  ├─ authStore.js
│  │  └─ socketStore.js
│  ├─ styles
│  │  ├─ App.css
│  │  ├─ game.css
│  │  └─ index.css
│  └─ utils
│     └─ socketHandlers.js
└─ vite.config.js

```
