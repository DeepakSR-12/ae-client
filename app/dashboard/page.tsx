"use client";

import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import { useMutateEvaluation, userVerifyEvaluations } from "@/hooks/evaluation";
import { useFetchAiResponses } from '@/hooks/aiResponses';
import Loader from '../../components/ui/Loader';

export default function Dashboard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [reasonObjToSave, setReasonObjToSave] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [wrongResponseError, setWrongResponseError] = useState(null);
  const [rankingType, setRankingType] = useState(null);
  const [aiPosts, setAiPosts] = useState([]);

  const openModal = () => setModalOpen(true);
  const { mutate } = useMutateEvaluation();
  const { mutate: mutateVerifyEvaluation } = userVerifyEvaluations((response: any) => {
    console.log("API DATA:    , ", response)
    setGenerating(false)
    if (response.result) {
      mutate(reasonObjToSave);
      closeModal();
      reset();
      const newAiPost = aiPosts.filter(post => post._id !== selectedPost);
      setAiPosts([...newAiPost]);
    } else {
      setWrongResponseError(response.reason)
    }
  })
  const closeModal = () => {
    setModalOpen(false)
    reset()
    setReasonObjToSave({})
    setWrongResponseError(null)
    setGenerating(false)
    setReasonObjToSave({})
    setSelectedPost(null);
    setRankingType(null);
  };


  const selectedForRanking = (id, type) => {
    setSelectedPost(id);
    openModal();
    setRankingType(type);
  };

  const submitReason = (data) => {
    const selectedPostDetails = aiPosts.find(post => post._id === selectedPost)
    setGenerating(true)
    mutateVerifyEvaluation({
      prompt: `
        originalQuestion:  ${selectedPostDetails.prompt} 
        originalResponse: ${selectedPostDetails.answer}
        userComment: ${data.reason}
      `
    })
    setReasonObjToSave({
      response: data.reason,
      reasonId: selectedPost,
      rate: rankingType === "upvote" ? 1 : -1,
      evaluatorId: selectedPost,
      isValidReason: true
    })
    // mutate({
    //   response: data.reason,
    //   reasonId: selectedPost,
    //   rate: rankingType === "upvote" ? 1 : -1,
    //   evaluatorId: selectedPost,
    //   isValidReason: true
    // });
  };

  const { data, isLoading, error } = useFetchAiResponses();


  const validationSchema = Yup.object().shape({
    reason: Yup.string()
      .required('Reason is required')
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

  useEffect(() => {
    if (data) {
      setAiPosts(data);
    }
  }, [data, isLoading, error]);

  return (
    <div className={styles.container}>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => {
          closeModal();
          reset()
        }}>
          <h2>Add Reason</h2>
          <p>Add your reason why think it should be upvoted or downvoted</p>
          <form onSubmit={handleSubmit(submitReason)}>
            <div className={styles.flexcol}>
              <textarea {...register('reason')} rows={5} />
              <span>{errors.reason?.message}</span>
              <span>{wrongResponseError}</span>
              {generating ? (
                <div className={styles.loader}>
                  <Loader/>
                </div>
              ) : (
                <Button type="submit">Submit</Button>
              )}

            </div>
          </form>
        </Modal>
      )}
      {aiPosts.map(post => (
        <div key={post.id} className={styles.inner}>
          <h2>{post.prompt}</h2>
          <p>{post.answer}</p>
          <div className={styles.flexBtnGroup}>
            <Button onClick={() => selectedForRanking(post._id, "upvote")}>Upvote</Button>
            <Button onClick={() => selectedForRanking(post._id, "downvote")}>Downvote</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
