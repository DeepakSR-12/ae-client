"use client";

import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Link from "next/link";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Document, Page, pdfjs, Thumbnail, Outline, BlobProvider } from 'react-pdf';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MyDocument } from '@/components/pdfviewer'
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import { useFetchOCR, useMutateOCRQuery } from '@/hooks/ai';

import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


export default function Dashboard() {

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [wrongResponseError, setWrongResponseError] = useState(null);
  const [tab, setTab] = useState(2);
  const [showDetails, setShowDetailsState] = useState(0);
  const [responseQuery, setResponseQuery] = useState("")
  const [globalResponseQuery, setGlobalResponseQuery] = useState("")
  const { mutate } = useMutateOCRQuery((data: string) => {
    setResponseQuery(data)
  });
  const { mutate: globalMutate } = useMutateOCRQuery((data: string) => {
    setGlobalResponseQuery(data)
  });

  const { data: wholeDataAlphabet } = useFetchOCR("ocrDetailA", { collectionName: "ocrDetail", key: "Alphabet" });
  const { data: keyValueDataAlphabet } = useFetchOCR("ocrDetailKeyValueA", { collectionName: "ocrDetailKeyValue", key: "Alphabet" });
  const { data: whyInvestAlphabet } = useFetchOCR("ocrDetailWhyInvestA", { collectionName: "ocrDetailWhyInvest", key: "Alphabet" });
  const { data: analyticalDataAlphabet } = useFetchOCR("ocrDetailAnalyseA", { collectionName: "ocrDetailAnalyse", key: "Alphabet" });

  const { data: wholeDataTesla } = useFetchOCR("ocrDetailT", { collectionName: "ocrDetail", key: "Tesla" });
  const { data: keyValueDataTesla } = useFetchOCR("ocrDetailKeyValueT", { collectionName: "ocrDetailKeyValue", key: "Tesla" });
  const { data: whyInvestTesla } = useFetchOCR("ocrDetailWhyInvestT", { collectionName: "ocrDetailWhyInvest", key: "Tesla" });
  const { data: analyticalDataTesla } = useFetchOCR("ocrDetailAnalyseT", { collectionName: "ocrDetailAnalyse", key: "Tesla" });


  const submitQueryAlphabet = (data: any) => {
    setResponseQuery("")
    mutate({
      collectionName: "ocrDetail",
      query: data.query,
      key: "Alphabet"
    });
  };

  const submitQueryTesla = (data: any) => {
    setResponseQuery("")
    mutate({
      collectionName: "ocrDetail",
      query: data.query,
      key: "Tesla"
    });
  };

  const submitQueryGlobal = (data: any) => {
    setResponseQuery("")
    globalMutate({
      collectionName: "ocrDetail",
      query: data.queryGlobal,
    });
  };

  const setShowDetails = (val: number): void => {
    setShowDetailsState(val)
    setResponseQuery("")
    reset()
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }



  const validationSchema = Yup.object().shape({
    query: Yup.string()
      .required("Query can't be empty")
    // .min(20, 'Reason must be at least 20 characters')
  });

  const validationGlobalSchema = Yup.object().shape({
    queryGlobal: Yup.string()
      .required("Query can't be empty")
    // .min(20, 'Reason must be at least 20 characters')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const {
    register: registerGlobal,
    handleSubmit: handleSubmitGlobal,
    reset: resetGlobal,
    formState: { errors: errorsGlobal }
  } = useForm({
    resolver: yupResolver(validationGlobalSchema)
  });

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.promptSectionHeaderInnerFlexHeader}>
          <div className={styles.askbGlobal}>
            <form onSubmit={handleSubmitGlobal(submitQueryGlobal)}>
              <div className={styles.flexrow}>
                <input {...registerGlobal('queryGlobal')} placeholder='Ask me anything on all reports...' className={styles.inputGlobal} />
                <Button type="submit" size="medium">Send</Button>
              </div>
              <span>{errors.query?.message}</span>
            </form>
            {globalResponseQuery && (
              <div className={styles.btnClear}>
                <Button onClick={() => setGlobalResponseQuery("")} size="medium" variant="ghost" >Clear</Button>
              </div>
            )}
            {globalResponseQuery && (
              <div className={styles.globalMarkdown}>
                <Markdown remarkPlugins={[remarkGfm]}>{globalResponseQuery}</Markdown>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.promptSectionHeader}>
          <div className={styles.promptSectionHeaderInnerFlex}>
            <div className={styles.flexHeader}>
              <h5>
                Title
              </h5>
              <p>
                Alphabet Announces First Quarter 2024 Results
              </p>
            </div>
            <div className={styles.flexHeader}>
              <h5>
                Company
              </h5>
              <p>
                Alphabet Inc
              </p>
            </div>
            <div className={styles.flexHeader}>
              <h5>
                Location
              </h5>
              <p>
                Mountain View, Calif.
              </p>
            </div>
            <div className={styles.flexHeader}>
              <h5>
                Date Created
              </h5>
              <p>
                April 25, 2024
              </p>
            </div>
            <div className={styles.flexHeader}>
              {showDetails === 1 && (
                <div onClick={() => setShowDetails(0)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              )}
              {showDetails === 0 && (
                <div onClick={() => setShowDetails(1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              )}
            </div>
          </div>
          {showDetails === 1 && (
            <div className={styles.promptSection}>
              <div className={styles.section}>
                <Markdown remarkPlugins={[remarkGfm]}>{analyticalDataAlphabet}</Markdown>
              </div>
              <div className={styles.section}>
                <Markdown remarkPlugins={[remarkGfm]}>{keyValueDataAlphabet}</Markdown>
              </div>
              <div className={styles.sectionOption}>
                <div className={styles.tab}>
                  <span className={`${styles.tabSection} ${tab === 1 ? styles.tabSectionActive : ""}`} onClick={() => setTab(1)}>Document</span>
                  <span className={`${styles.tabSection} ${tab === 2 ? styles.tabSectionActive : ""}`} onClick={() => setTab(2)}>Summary</span>
                  <span className={`${styles.tabSection} ${tab === 3 ? styles.tabSectionActive : ""}`} onClick={() => setTab(3)}>Investment Suggestion</span>
                  <span className={`${styles.tabSection} ${tab === 4 ? styles.tabSectionActive : ""}`} onClick={() => setTab(4)}>Ask AI</span>
                </div>
                {tab === 1 && (
                  <div>
                    <Document
                      className={styles.pdf}
                      file="/alphabet.pdf"
                      onLoadSuccess={() => { }}
                    >
                      <Thumbnail className={styles.thumbnail} pageNumber={1} width={300} />
                    </Document>
                  </div>
                )}
                {tab === 2 && (
                  <div className={styles.askbPromptFull}>
                    <Markdown remarkPlugins={[remarkGfm]}>{wholeDataAlphabet}</Markdown>
                  </div>
                )}
                {tab === 3 && (
                  <div className={styles.askbPromptFull}>
                    <Markdown remarkPlugins={[remarkGfm]}>{whyInvestAlphabet}</Markdown>
                  </div>
                )}
                {tab === 4 && (
                  <div>
                    <div className={styles.askbPrompt}>
                      <Markdown remarkPlugins={[remarkGfm]}>{responseQuery}</Markdown>
                    </div>
                    <div className={styles.askb}>
                      <form onSubmit={handleSubmit(submitQueryAlphabet)}>
                        <div className={styles.flexrow}>
                          <input {...register('query')} placeholder='Ask me anything..' className={styles.input} />
                          <Button type="submit">Send</Button>
                        </div>
                        <span>{errors.query?.message}</span>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.promptSectionHeader}>
          <div className={styles.promptSectionHeaderInnerFlex}>
            <div className={styles.flexHeader}>
              <h5>
                Title
              </h5>
              <p>
                Tesla Q1 2024 Update
              </p>
            </div>
            <div className={styles.flexHeader}>
              <h5>
                Company
              </h5>
              <p>
                Tesla
              </p>
            </div>
            <div className={styles.flexHeader}>
              <h5>
                Location
              </h5>
              <p>
                Austin, Texas, United States
              </p>
            </div>
            <div className={styles.flexHeader}>
              <h5>
                Date Created
              </h5>
              <p>
                April 21, 2024
              </p>
            </div>
            <div className={styles.flexHeader}>
              {showDetails === 2 && (
                <div onClick={() => setShowDetails(0)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              )}
              {showDetails === 0 && (
                <div onClick={() => setShowDetails(2)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              )}
            </div>
          </div>
          {showDetails === 2 && (
            <div className={styles.promptSection}>
              <div className={styles.section}>
                <Markdown remarkPlugins={[remarkGfm]}>{analyticalDataTesla}</Markdown>
              </div>
              <div className={styles.section}>
                <Markdown remarkPlugins={[remarkGfm]}>{keyValueDataTesla}</Markdown>
              </div>
              <div className={styles.sectionOption}>
                <div className={styles.tab}>
                  <span className={`${styles.tabSection} ${tab === 1 ? styles.tabSectionActive : ""}`} onClick={() => setTab(1)}>Document</span>
                  <span className={`${styles.tabSection} ${tab === 2 ? styles.tabSectionActive : ""}`} onClick={() => setTab(2)}>Summary</span>
                  <span className={`${styles.tabSection} ${tab === 3 ? styles.tabSectionActive : ""}`} onClick={() => setTab(3)}>Investment Suggestion</span>
                  <span className={`${styles.tabSection} ${tab === 4 ? styles.tabSectionActive : ""}`} onClick={() => setTab(4)}>Ask AI</span>
                </div>
                {tab === 1 && (
                  <div>
                    <Document
                      className={styles.pdf}
                      file="/tesla.pdf"
                      onLoadSuccess={() => { }}
                    >
                      <Thumbnail className={styles.thumbnail} pageNumber={1} width={400} />
                    </Document>
                  </div>
                )}
                {tab === 2 && (
                  <div className={styles.askbPromptFull}>
                    <Markdown remarkPlugins={[remarkGfm]}>{wholeDataTesla}</Markdown>
                  </div>
                )}
                {tab === 3 && (
                  <div className={styles.askbPromptFull}>
                    <Markdown remarkPlugins={[remarkGfm]}>{whyInvestTesla}</Markdown>
                  </div>
                )}
                {tab === 4 && (
                  <div>
                    <div className={styles.askbPrompt}>
                      <Markdown remarkPlugins={[remarkGfm]}>{responseQuery}</Markdown>
                    </div>
                    <div className={styles.askb}>
                      <form onSubmit={handleSubmit(submitQueryTesla)}>
                        <div className={styles.flexrow}>
                          <input {...register('query')} placeholder='Ask me anything..' className={styles.input} />
                          <Button type="submit">Send</Button>
                        </div>
                        <span>{errors.query?.message}</span>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
