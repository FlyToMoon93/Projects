import dynamic from 'next/dynamic';

const AddArticleComponent = dynamic(() => import('@/components/logout/[index]'), {
    ssr: false
});

const AddArticle = () => (
    <div>
        <AddArticleComponent />
    </div>
);

export default AddArticle;
