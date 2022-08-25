import testQuestion from "./testQuestion";

type practiceTest = {
    id: string;
    created_at: string;
    title: string;
    show_on_init: boolean;
    page_id: string;
    test_questions?: testQuestion[]
}

export default practiceTest