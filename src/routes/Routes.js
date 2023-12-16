import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import JobListingPage from '../components/main/JobListingPage'
import JobPage from '../components/main/JobPage'
import SkillDetailsPage from '../components/main/SkillDetailsPage'
import ErrorLayout from "../components/layouts/ErrorLayout";
import SearchHistoryPage from "../components/main/SearchHistoryPage";

 export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout/>}>
        <Route path="/jobs" element={<JobListingPage/>} errorElement={<ErrorLayout error={{ message: 'Page not found' }}/>}/>
        <Route path="/jobs/search" element={<SearchHistoryPage/>} errorElement={<ErrorLayout error={{ message: 'Page not found' }}/>}/>
        <Route path="job/:id" element={<JobPage/>} errorElement={<ErrorLayout error={{ message: 'Page not found' }}/>}/>
        <Route path="skill/:id" element={<SkillDetailsPage/>} errorElement={<ErrorLayout error={{ message: 'Page not found' }}/>}/>
      </Route>
    )
  )

