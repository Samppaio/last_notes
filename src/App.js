import Actions from "./components/Actions";
import Header from "./components/Header";
import Logo from "./components/Logo";
import Notes from "./components/Notes";
import NotesArea from "./components/NotesArea";
import HighlightProvider from "./context/HighlightContext";
import NoteFormProvider from "./context/NoteFormContext";
import NoteListProvider from "./context/NoteListContext";
import "./global.css";

function App() {
  return (
    <HighlightProvider>
      <NoteFormProvider>
        <NoteListProvider>
          <Header>
            <Logo />
            <Actions />
          </Header>
          <NotesArea>
            <Notes />
          </NotesArea>
        </NoteListProvider>
      </NoteFormProvider>
    </HighlightProvider>
  );
}

export default App;
