import { Routes, Route } from 'react-router-dom'
import { ThemeProviders } from './theme-providers'
import { SearchProvider } from '@/components/SearchProvider'
import Analytics from '@/components/Analytics'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import Tags from './pages/Tags'
import TagPage from './pages/TagPage'
import About from './pages/About'
import Experiment from './pages/Experiment'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <ThemeProviders>
      <Analytics />
      <SectionContainer>
        <SearchProvider>
          <Header />
          <main className="mb-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/page/:page" element={<BlogList />} />
              <Route path="/blog/*" element={<BlogPost />} />
              <Route path="/tags" element={<Tags />} />
              <Route path="/tags/:tag" element={<TagPage />} />
              <Route path="/tags/:tag/page/:page" element={<TagPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/experiment" element={<Experiment />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </SearchProvider>
      </SectionContainer>
    </ThemeProviders>
  )
}
