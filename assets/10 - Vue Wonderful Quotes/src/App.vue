<template>
    <div class="container">
        <app-header :quoteCount="quotes.length" :maxQuotes="maxQuotes"></app-header>
        <new-quote @quoteAdded="newQuote"></new-quote>
        <quote-grid :quotes="quotes" @quoteDeleted="deleteQuote"></quote-grid>
        <div class="row">
            <div class="col-sm-12 text-center">
                <div class="alert alert-info">Info: Click on a Quote to delete it!</div>  
            </div>
        </div>
    </div>
</template>

<script>
import QuoteGrid from './components/QuoteGrid.vue'
import NewQuote from './components/NewQuote.vue'
import Header from './components/Header.vue'

export default {
    components: {
        'quote-grid': QuoteGrid,
        'new-quote': NewQuote,
        'app-header': Header
    },
    data: function() {
        return {
            quotes: [
                'Just a Quote to see something'
            ],
            maxQuotes: 10
        }
    },
    methods: {
        newQuote(quote) {
            if(this.quotes.length != 10)
                this.quotes.push(quote);
        },
        deleteQuote(index) {
            this.quotes.splice(index, 1);
        }
    }
}
</script>

<style>
</style>
